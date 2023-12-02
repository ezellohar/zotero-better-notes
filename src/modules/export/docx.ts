import { showHintWithLink } from "../../utils/hint";
import { renderNoteHTML } from "../../utils/note";
import { randomString } from "../../utils/str";
import { waitUtilAsync } from "../../utils/wait";
import { config } from "../../../package.json";

export async function saveDocx(filename: string, noteId: number) {
  const noteItem = Zotero.Items.get(noteId);
  await Zotero.File.putContentsAsync(filename, await note2docx(noteItem));
  showHintWithLink(`Note Saved to ${filename}`, "Show in Folder", (ev) => {
    Zotero.File.reveal(filename);
  });
}

async function note2docx(noteItem: Zotero.Item) {
  const renderedContent = parseDocxCitationFields(
    await renderNoteHTML(noteItem),
  );
  let htmlDoc =
    '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"></head>\n';
  htmlDoc += renderedContent;
  htmlDoc += "\n</html>";

  ztoolkit.log(`[Note2DOCX] ${htmlDoc}`);

  let blob: ArrayBufferLike;
  const lock = Zotero.Promise.defer();
  const jobId = randomString(6, new Date().toUTCString());
  const listener = (ev: MessageEvent) => {
    if (ev.data.type === "parseDocxReturn" && ev.data.jobId === jobId) {
      blob = ev.data.message;
      lock.resolve();
    }
  };
  const worker = await getWorker();
  worker.contentWindow?.addEventListener("message", listener);
  worker.contentWindow?.postMessage(
    {
      type: "parseDocx",
      jobId,
      message: htmlDoc,
    },
    "*",
  );
  await lock.promise;
  worker.contentWindow?.removeEventListener("message", listener);
  destroyWorker(worker);
  return blob!;
}

type CitationCache = Record<string, { field: string; text: string }>;

function parseDocxCitationFields(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const citationCache = {} as CitationCache;
  /*
  [
    {
      "uris": ["http://zotero.org/users/6099279/items/922WYJ9X"],
      "itemData": {
        "id": "http://zotero.org/users/6099279/items/922WYJ9X",
        "type": "paper-conference",
        "event-title": "Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition",
        "page": "4104-4113",
        "source": "www.cv-foundation.org",
        "title": "Structure-From-Motion Revisited",
        "URL": "https://www.cv-foundation.org/openaccess/content_cvpr_2016/html/Schonberger_Structure-From-Motion_Revisited_CVPR_2016_paper.html",
        "author": [
          { "family": "Schonberger", "given": "Johannes L." },
          { "family": "Frahm", "given": "Jan-Michael" }
        ],
        "accessed": { "date-parts": [["2022", 11, 16]] },
        "issued": { "date-parts": [["2016"]] }
      }
    }
  ]
  */
  const globalCitationItems = tryParse(
    doc
      .querySelector("div[data-citation-items]")
      ?.getAttribute("data-citation-items") || "{}",
  );
  const citationElements = Array.from(
    doc.querySelectorAll(".citation[data-citation]"),
  );
  for (let i = 0; i < citationElements.length; i++) {
    const elem = citationElements[i];
    /*
    {
      "citationItems": [
        { "uris": ["http://zotero.org/users/6099279/items/U7HUIWS8"] },
        { "uris": ["http://zotero.org/users/6099279/items/KA7GRTJV"] }
      ],
      "properties": {}
    }
    */
    const citation = tryParse(elem.getAttribute("data-citation") || "{}");
    const citationItems = [];
    for (const citationItem of citation.citationItems) {
      const item = globalCitationItems.find(
        (item: any) => item.uris[0] === citationItem.uris[0],
      );
      citationItems.push(item);
    }
    const properties = citation.properties;
    const formattedCitation = `${
      elem.textContent || "Zotero Citation"
    } - Please click Zotero - Refresh in Word/LibreOffice to update all fields.`;
    properties.formattedCitation = formattedCitation;
    properties.plainCitation = formattedCitation + " ";
    properties.noteIndex = 0;
    const citationID = getCitationID(citationCache);

    const csl = {
      citationID,
      citationItems,
      properties,
      schema:
        "https://github.com/citation-style-language/schema/raw/master/csl-citation.json",
    };
    const newElem = doc.createElement("span");
    citationCache[citationID].field = JSON.stringify(csl);
    citationCache[citationID].text = formattedCitation;
    newElem.setAttribute("data-bn-citation-index", citationID);
    elem.parentNode!.replaceChild(newElem, elem);

    /*
    <!--[if supportFields]>
    <span style='mso-element:field-begin'></span>
    <span style='mso-spacerun:yes'> </span>
    ADDIN ZOTERO_ITEM CSL_CITATION {...}
    <span style='mso-element:field-separator'></span>
    <span style='mso-no-proof:yes'>
        Zotero Citation - Please select all using CTRL+T and press F9 to update all fields.
    </span>
    <span style='mso-element:field-end'></span>
    <![endif]-->
    {
      "citationID": "T21wEH05",
      "properties": { "formattedCitation": "[15]", "plainCitation": "[15]", "noteIndex": 0 },
      "citationItems": [
        {
          "id": 5,
          "uris": ["http://zotero.org/users/6099279/items/YS6VW4KZ"],
          "itemData": {
            "id": 5,
            "type": "article",
            "abstract": "Neural fields have achieved impressive advancements in view synthesis and scene reconstruction. However, editing these neural fields remains challenging due to the implicit encoding of geometry and texture information. In this paper, we propose DreamEditor, a novel framework that enables users to perform controlled editing of neural fields using text prompts. By representing scenes as mesh-based neural fields, DreamEditor allows localized editing within specific regions. DreamEditor utilizes the text encoder of a pretrained text-to-Image diffusion model to automatically identify the regions to be edited based on the semantics of the text prompts. Subsequently, DreamEditor optimizes the editing region and aligns its geometry and texture with the text prompts through score distillation sampling [29]. Extensive experiments have demonstrated that DreamEditor can accurately edit neural fields of real-world scenes according to the given text prompts while ensuring consistency in irrelevant areas. DreamEditor generates highly realistic textures and geometry, significantly surpassing previous works in both quantitative and qualitative evaluations.",
            "note": "arXiv:2306.13455 [cs]",
            "number": "arXiv:2306.13455",
            "publisher": "arXiv",
            "source": "arXiv.org",
            "title": "DreamEditor: Text-Driven 3D Scene Editing with Neural Fields",
            "title-short": "DreamEditor",
            "URL": "http://arxiv.org/abs/2306.13455",
            "author": [
              { "family": "Zhuang", "given": "Jingyu" },
              { "family": "Wang", "given": "Chen" },
              { "family": "Liu", "given": "Lingjie" },
              { "family": "Lin", "given": "Liang" },
              { "family": "Li", "given": "Guanbin" }
            ],
            "accessed": { "date-parts": [["2023", 7, 11]] },
            "issued": { "date-parts": [["2023", 6, 29]] }
          }
        }
      ],
      "schema": "https://github.com/citation-style-language/schema/raw/master/csl-citation.json"
    }
    */
  }

  const str = doc.body.innerHTML;

  // Replace all <span data-bn-citation-index="T21wEH05"></span> with ADDIN ZOTERO_ITEM CSL_CITATION {...}
  const re = /<span data-bn-citation-index="([^"]+)"><\/span>/g;
  const parsed = str
    .replace(re, (match, p1) => {
      return `<!--[if supportFields]>
<span style='mso-element:field-begin'></span>
<span style='mso-spacerun:yes'> </span>
ADDIN ZOTERO_ITEM CSL_CITATION ${htmlEscape(doc, citationCache[p1].field)}
<span style='mso-element:field-separator'></span>
<span style='mso-no-proof:yes'>
${htmlEscape(doc, citationCache[p1].text)}
</span>
<span style='mso-element:field-end'></span>
<![endif]-->`;
    })
    .replaceAll("\x3C!--[if supportFields]>", "<!--[if supportFields]>");

  return parsed;
}

function getCitationID(citationCache: CitationCache) {
  let citationID = Zotero.Utilities.randomString();
  while (citationID in citationCache) {
    citationID = Zotero.Utilities.randomString();
  }
  citationCache[citationID] = {
    field: "",
    text: "",
  };
  return citationID;
}

function tryParse(s: string) {
  try {
    return JSON.parse(decodeURIComponent(s));
  } catch (e) {
    return null;
  }
}

function htmlEscape(doc: Document, str: string) {
  const div = doc.createElement("div");
  const text = doc.createTextNode(str);
  div.appendChild(text);
  return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function getWorker(): Promise<HTMLIFrameElement> {
  const worker = ztoolkit.UI.createElement(document, "iframe", {
    properties: {
      src: `chrome://${config.addonRef}/content/docxExport.html`,
    },
    styles: {
      width: "0",
      height: "0",
      border: "0",
      position: "absolute",
    },
  });
  window.document.documentElement.appendChild(worker);
  await waitUtilAsync(() => worker.contentDocument?.readyState === "complete");
  return worker;
}

function destroyWorker(worker: any) {
  worker.parentNode.removeChild(worker);
  worker = null;
}
