title = Template Editor

templateType = Template Type

templateType-item =
    .label = Item
templateType-text =
    .label = Text
templateType-system =
    .label = Builtin
templateType-unknown =
    .label = ?
templateType-help =
    .label = About...
    .title = Detailed explanation of template types

templateName = Template Name

previewContainer = 
    .label = Preview
create = 
    .label = New
save = 
    .label = Save
delete = 
    .label = Delete
reset = 
    .label = Reset
more = 
    .label = More Templates
    .title = Get more templates online

options = 
    .label = Options
importClipboard = 
    .label = Import template: from template share code in clipboard
importNote = 
    .label = Import template: from existing note
share = 
    .label = Copy template share code to clipboard
backup = 
    .label = Export backup file
restore = 
    .label = Restore from backup file
help = 
    .label = Help

snippet-useMarkdown = use markdown
    .title = Parse the template as markdown
snippet-useRefresh = use refresh
    .title = Allow the content generated by the template to be refreshed
snippet-inlineScript = inline script
    .title = Add an inline JS script, the result of which will be embedded in the note
snippet-multiLineScript = multi-line script
    .title = Add a multi-line async JS script, the return value of which will be embedded in the note
snippet-markdownHeading1 = heading 1
    .title = Markdown heading 1, type `#` at the beginning of the line followed by your heading. Should be used in markdown mode
snippet-markdownHeading2 = heading 2
    .title = Markdown heading 2, type `##` at the beginning of the line followed by your heading. Should be used in markdown mode
snippet-markdownHeading3 = heading 3
    .title = Markdown heading 3, type `###` at the beginning of the line followed by your heading. Should be used in markdown mode
snippet-markdownBullet = bullet list
    .title = Markdown bullet list, type `-` at the beginning of the line followed by your list item. Should be used in markdown mode
snippet-markdownNumber = number list
    .title = Markdown number list, type `1.` at the beginning of the line followed by your list item. Should be used in markdown mode
snippet-markdownBold = bold text
    .title = Markdown bold text, type `**` at the beginning and end of your text. Should be used in markdown mode
snippet-markdownItalic = italic text
    .title = Markdown italic text, type `_` at the beginning and end of your text. Should be used in markdown mode
snippet-markdownLink = link
    .title = Markdown link, type `[` at the beginning and `](url)` at the end of your text. Should be used in markdown mode
snippet-markdownMonospace = monospace text
    .title = Markdown monospace text, type ` at the beginning and end of your text. Should be used in markdown mode
snippet-markdownQuote = quote
    .title = Markdown quote, type `>` at the beginning of the line followed by your quote. Should be used in markdown mode
snippet-markdownTable = table
    .title = Markdown table, type `|` to separate columns and rows. Should be used in markdown mode
snippet-dryRunFlag = dry run flag
    .title = Check if the template is running in dry run mode, e.g. for preview. In dry run mode, the script should not have side effects.
snippet-itemBeforeLoop = before loop
    .title = Content to be rendered before the loop of items
snippet-itemInLoop = in loop
    .title = Content to be rendered for each item in the loop
snippet-itemAfterLoop = after loop
    .title = Content to be rendered after the loop of items
snippet-itemItems = items
    .title = Type: Zotero.Item[]. The array of items to be rendered, available in beforeLoop and afterLoop stage
snippet-itemItem = item
    .title = Type: Zotero.Item. The current item to be rendered, available in inLoop stage
snippet-itemTopItem = top item
    .title = Type: Zotero.Item. The top-level parent of the variable `item`, available in inLoop stage
snippet-itemTargetNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to which the template is attached, available in any stage
snippet-itemCopyNoteImage = copy note image
    .title = Type: Function. Copy the image of the note to the clipboard, available in any stage
snippet-itemSharedObj = shared object
    .title = Type: Object. A shared object that can be used to store data across different stages
snippet-itemFieldTitle = title
    .title = Type: string. The title of the top item
snippet-itemFieldAbstract = abstract
    .title = Type: string. The abstract of the top item
snippet-itemFieldCitKey = citation key
    .title = Type: string. The citation key of the top item
snippet-itemFieldDate = date
    .title = Type: string. The publication date of the top item
snippet-itemFieldDOI = DOI
    .title = Type: string. The DOI of the top item
snippet-itemFieldDOIURL = DOI or URL
    .title = Type: string. The DOI or URL of the top item
snippet-itemFieldAuthors = authors
    .title = Type: string. The authors of the top item
snippet-itemFieldJournal = journal
    .title = Type: string. The journal of the top item
snippet-itemFieldTitleTranslation = title translation
    .title = Type: string. The title translation of the top item
snippet-textTargetNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to which the template is attached
snippet-textSharedObj = shared object
    .title = Type: Object. A shared object that can be used to store data
snippet-quickInsertLink = note link
    .title = Type: string. The link of the note item to be linked
snippet-quickInsertLinkText = link text
    .title = Type: string. The default label of the link
snippet-quickInsertSubNoteItem = linked note
    .title = Type: Zotero.NoteItem. The note item to be linked to
snippet-quickInsertNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to which the template is attached
snippet-quickImportLink = note link
    .title = Type: string. The link of the note item to be imported
snippet-quickImportNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to which the template is attached
snippet-quickNoteAnnotationItem = annotation
    .title = Type: Zotero.AnnotationItem. The annotation item to be converted to a note
snippet-quickNoteTopItem = top item
    .title = Type: Zotero.Item. The top-level parent of the variable `annotationItem`
snippet-quickNoteNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to which the template is attached
snippet-exportMDFileNameNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to be exported
snippet-exportMDFileHeaderNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to be exported
snippet-exportMDFileContentNoteItem = target note
    .title = Type: Zotero.NoteItem. The note item to be exported
snippet-exportMDFileContentMDContent = markdown content
    .title = Type: string. The markdown content to be exported
