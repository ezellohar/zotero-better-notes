import { config } from "../package.json";
import { initLocale } from "./utils/locale";
import { registerPrefsWindow } from "./modules/preferenceWindow";
import { registerNoteLinkProxyHandler } from "./modules/noteLink";
import { registerEditorInstanceHook } from "./modules/editor/initalize";
import {
  importTemplateFromClipboard,
  initTemplates,
} from "./modules/template/controller";
import { registerMenus } from "./modules/menu";
import {
  activateWorkspaceTab,
  deActivateWorkspaceTab,
  registerWorkspaceTab,
  TAB_TYPE,
  unregisterWorkspaceTab,
} from "./modules/workspace/tab";
import {
  initWorkspace,
  initWorkspaceEditor,
  toggleNotesPane,
  toggleOutlinePane,
  togglePreviewPane,
  updateOutline,
} from "./modules/workspace/content";
import { registerNotify } from "./modules/notify";
import { showWorkspaceWindow } from "./modules/workspace/window";
import {
  registerReaderAnnotationButton,
} from "./modules/reader";
import { setSyncing, callSyncing } from "./modules/sync/hooks";
import {
  showTemplatePicker,
  updateTemplatePicker,
} from "./modules/template/picker";
import { showImageViewer } from "./modules/imageViewer";
import { showExportNoteOptions } from "./modules/export/exportWindow";
import { showSyncDiff } from "./modules/sync/diffWindow";
import { showSyncInfo } from "./modules/sync/infoWindow";
import { showSyncManager } from "./modules/sync/managerWindow";
import { showTemplateEditor } from "./modules/template/editorWindow";
import {
  createNoteFromTemplate,
  createWorkspaceNote,
  createNoteFromMD,
} from "./modules/createNote";
import { annotationTagAction } from "./modules/annotationTagAction";
import { createZToolkit } from "./utils/ztoolkit";
import { waitUtilAsync } from "./utils/wait";
import { initSyncList } from "./modules/sync/api";
import { getPref } from "./utils/prefs";

async function onStartup() {
  await Promise.all([
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]);
  initLocale();
  ztoolkit.ProgressWindow.setIconURI(
    "default",
    `chrome://${config.addonRef}/content/icons/favicon.png`,
  );

  registerNoteLinkProxyHandler();

  registerEditorInstanceHook();

  registerPrefsWindow();

  registerReaderAnnotationButton();

  initSyncList();

  setSyncing();

  await onMainWindowLoad(window);
}

async function onMainWindowLoad(win: Window): Promise<void> {
  await waitUtilAsync(() => document.readyState === "complete");
  // Create ztoolkit for every window
  addon.data.ztoolkit = createZToolkit();

  registerNotify(["tab", "item", "item-tag"]);

  registerMenus();

  registerWorkspaceTab();

  initTemplates();
}

async function onMainWindowUnload(win: Window): Promise<void> {
  ztoolkit.unregisterAll();
}

function onShutdown(): void {
  ztoolkit.unregisterAll();
  // Remove addon object
  addon.data.alive = false;
  unregisterWorkspaceTab();
  delete Zotero[config.addonInstance];
}

/**
 * This function is just an example of dispatcher for Notify events.
 * Any operations should be placed in a function to keep this funcion clear.
 */
function onNotify(
  event: string,
  type: string,
  ids: number[] | string[],
  extraData: { [key: string]: any },
) {
  if (extraData.skipBN) {
    return;
  }
  // Workspace tab select/unselect callback
  if (event === "select" && type === "tab") {
    if (extraData[ids[0]].type == TAB_TYPE) {
      activateWorkspaceTab();
    } else {
      deActivateWorkspaceTab();
    }
  }
  // Workspace main note update
  if (event === "modify" && type === "item") {
    if ((ids as number[]).includes(addon.data.workspace.mainId)) {
      addon.data.workspace.tab.active &&
        updateOutline(addon.data.workspace.tab.container!);
      addon.data.workspace.window.active &&
        updateOutline(addon.data.workspace.window.container!);
      if (getPref("workspace.autoUpdateRelatedNotes")) {
        addon.api.note.updateRelatedNotes(addon.data.workspace.mainId);
      }
    }
  }
  if (event === "modify" && type === "item") {
    const modifiedNotes = Zotero.Items.get(ids).filter((item) => item.isNote());
    if (modifiedNotes.length) {
      addon.hooks.onSyncing(modifiedNotes, {
        quiet: true,
        skipActive: true,
        reason: "item-modify",
      });
    }
  }
  // Insert annotation when assigning tag starts with @
  if (event === "add" && type === "item-tag") {
    annotationTagAction(ids as number[], extraData);
  } else {
    return;
  }
}

/**
 * This function is just an example of dispatcher for Preference UI events.
 * Any operations should be placed in a function to keep this funcion clear.
 * @param type event type
 * @param data event data
 */
async function onPrefsEvent(type: string, data: { [key: string]: any }) {
  switch (type) {
    case "load":
      // registerPrefsScripts(data.window);
      break;
    default:
      return;
  }
}

function onOpenNote(
  noteId: number,
  mode: "auto" | "preview" | "workspace" | "standalone" = "auto",
  options: {
    lineIndex?: number;
    sectionName?: string;
  } = {},
) {
  const noteItem = Zotero.Items.get(noteId);
  if (!noteItem?.isNote()) {
    ztoolkit.log(`onOpenNote: ${noteId} is not a note.`);
    return;
  }
  if (mode === "auto") {
    if (noteId === addon.data.workspace.mainId) {
      mode = "workspace";
    } else if (
      addon.data.workspace.tab.active ||
      addon.data.workspace.window.active
    ) {
      mode = "preview";
    } else {
      mode = "standalone";
    }
  }
  switch (mode) {
    case "preview":
      addon.hooks.onSetWorkspaceNote(noteId, "preview", options);
      break;
    case "workspace":
      addon.hooks.onSetWorkspaceNote(noteId, "main", options);
      break;
    case "standalone":
      ZoteroPane.openNoteWindow(noteId);
      break;
    default:
      break;
  }
}

function onSetWorkspaceNote(
  noteId: number,
  type: "main" | "preview" = "main",
  options: {
    lineIndex?: number;
    sectionName?: string;
  } = {},
) {
  if (type === "main") {
    addon.data.workspace.mainId = noteId;
    addon.data.workspace.tab.active &&
      updateOutline(addon.data.workspace.tab.container!);
    addon.data.workspace.window.active &&
      updateOutline(addon.data.workspace.window.container!);
  }
  if (addon.data.workspace.window.active) {
    initWorkspaceEditor(
      addon.data.workspace.window.container!,
      type,
      noteId,
      options,
    );
    type === "preview" &&
      addon.hooks.onToggleWorkspacePane(
        "preview",
        true,
        addon.data.workspace.window.container,
      );
    addon.data.workspace.window.window?.focus();
  }
  if (addon.data.workspace.tab.active) {
    initWorkspaceEditor(
      addon.data.workspace.tab.container!,
      type,
      noteId,
      options,
    );
    type === "preview" &&
      addon.hooks.onToggleWorkspacePane(
        "preview",
        true,
        addon.data.workspace.tab.container,
      );
    Zotero_Tabs.select(addon.data.workspace.tab.id!);
  }
}

function onOpenWorkspace(type: "tab" | "window" = "tab") {
  if (type === "window") {
    if (addon.data.workspace.window.active) {
      addon.data.workspace.window.window?.focus();
      return;
    }
    showWorkspaceWindow();
    return;
  }
  if (type === "tab") {
    // selecting tab will auto load the workspace content
    Zotero_Tabs.select(addon.data.workspace.tab.id!);
    return;
  }
}

const onInitWorkspace = initWorkspace;

function onToggleWorkspacePane(
  type: "outline" | "preview" | "notes",
  visibility?: boolean,
  container?: XUL.Box,
) {
  switch (type) {
    case "outline":
      toggleOutlinePane(visibility, container);
      break;
    case "preview":
      togglePreviewPane(visibility, container);
      break;
    case "notes":
      toggleNotesPane(visibility);
      break;
    default:
      break;
  }
}

const onSyncing = callSyncing;

const onShowTemplatePicker = showTemplatePicker;

const onUpdateTemplatePicker = updateTemplatePicker;

const onImportTemplateFromClipboard = importTemplateFromClipboard;

const onShowImageViewer = showImageViewer;

const onShowExportNoteOptions = showExportNoteOptions;

const onShowSyncInfo = showSyncInfo;

const onShowSyncManager = showSyncManager;

const onShowSyncDiff = showSyncDiff;

const onShowTemplateEditor = showTemplateEditor;

const onCreateWorkspaceNote = createWorkspaceNote;

const onCreateNoteFromTemplate = createNoteFromTemplate;

const onCreateNoteFromMD = createNoteFromMD;

// Add your hooks here. For element click, etc.
// Keep in mind hooks only do dispatch. Don't add code that does real jobs in hooks.
// Otherwise the code would be hard to read and maintain.

export default {
  onStartup,
  onMainWindowLoad,
  onMainWindowUnload,
  onShutdown,
  onNotify,
  onPrefsEvent,
  onOpenNote,
  onInitWorkspace,
  onSetWorkspaceNote,
  onOpenWorkspace,
  onToggleWorkspacePane,
  onSyncing,
  onShowTemplatePicker,
  onUpdateTemplatePicker,
  onImportTemplateFromClipboard,
  onShowImageViewer,
  onShowExportNoteOptions,
  onShowSyncDiff,
  onShowSyncInfo,
  onShowSyncManager,
  onShowTemplateEditor,
  onCreateWorkspaceNote,
  onCreateNoteFromTemplate,
  onCreateNoteFromMD,
};
