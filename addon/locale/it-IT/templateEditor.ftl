title = Editor dei template

templateType = Tipo di Template

templateType-item =
    .label = Elemento
templateType-text =
    .label = Testo
templateType-system =
    .label = Integrato
templateType-unknown =
    .label = ?
templateType-help =
    .label = Informazioni su...
    .title = Spiegazioni dettagliate sui tipi di template

templateName = Nome template

previewContainer = 
    .label = Anteprima
create = 
    .label = Nuovo
save = 
    .label = Salva
delete = 
    .label = Elimina
reset = 
    .label = Ripristina
more = 
    .label = Altri Template
    .title = Ottieni altri template online

options = 
    .label = Opzioni
importClipboard = 
    .label = Importa template: da il codice di condivisione template negli appunti
importNote = 
    .label = Importa template: da nota esistente
share = 
    .label = Copia codice di condivisione template negli appunti
backup = 
    .label = Esporta file di backup
restore = 
    .label = Ripristina da file di backup
help = 
    .label = Aiuto

snippet-useMarkdown = usa markdown
    .title = Elabora il template come markdown
snippet-useRefresh = abilita aggiornamento
    .title = Permetti al contenuto generato dal template di essere aggiornato
snippet-inlineScript = script in-linea
    .title = Aggiungi uno script JS in-linea, e inserisci il risultato nella nota
snippet-multiLineScript = script multi-linea
    .title = Aggiungi uno script JS multi-linea, e inserisci il valore risultante nella nota
snippet-markdownHeading1 = intestazione 1
    .title = Intestazione 1 Markdown, digita `#` a inizio riga seguito dall'intestazione. Da usare in modalità markdown
snippet-markdownHeading2 = intestazione 2
    .title = Intestazione 2 Markdown, digita `##` a inizio riga seguito dall'intestazione. Da usare in modalità markdown
snippet-markdownHeading3 = intestazione 3
    .title = Intestazione 3 Markdown, digita `###` a inizio riga seguito dall'intestazione. Da usare in modalità markdown
snippet-markdownBullet = elenco puntato
    .title = Elenco puntato Markdown, digita `-` a inizio riga seguito dalla voce elenco. Da usare in modalità markdown
snippet-markdownNumber = elenco numerato
    .title = Elenco numerato Markdown, digita `1.` a inizio riga seguito dalla voce elenco. Da usare in modalità markdown
snippet-markdownBold = grassetto
    .title = Grassetto Markdown, digita `**` a inizio e alla fine del testo. Da usare in modalità markdown
snippet-markdownItalic = corsivo
    .title = Corsivo Markdown, digita `_` a inizio e alla fine del testo. Da usare in modalità markdown
snippet-markdownLink = link
    .title = Link Markdown, digita `[` all'inizio e `](url)` alla fine del testo. Da usare in modalità markdown
snippet-markdownMonospace = testo monospaziato
    .title = Testo monospaziato Markdown, digita ` a inizio e alla fine del testo. Da usare in modalità markdown
snippet-markdownQuote = citazione
    .title = Citazione Markdown, digita `>` a inizio della riga seguito dalla citazione. Da usare in modalità markdown
snippet-markdownTable = tabella
    .title = Tabella Markdown, digita `|` per separare righe e colonne. Da usare in modalità markdown
snippet-dryRunFlag = esecuzione simulata
    .title = Verifica che il template sia in modalità simulata, ad esempio come anteprima. In modalità di esecuzione simulata, lo script non apporta modifiche e quindi non dovrebbe avere effetti indesiderati.
snippet-itemBeforeLoop = prima del loop
    .title = Contenuto da renderizzare prima del loop degli elementi
snippet-itemInLoop = nel loop
    .title = Contenuto da renderizzare per ogni elemento del loop
snippet-itemAfterLoop = dopo il loop
    .title = Contenuto da renderizzare dopo il loop degli elementi

-variable-type = Type
-variable-item = Zotero.Item
-variable-note = Zotero.NoteItem
-variable-annotation = Zotero.AnnotationItem
-variable-string = string
-variable-object = object
-variable-function = function

snippet-itemItems = elementi
    .title = { -variable-type }: { -variable-item }[]. L'array di elementi da renderizzare, disponibile negli stadi prima o dopo il loop
snippet-itemItem = elemento
    .title = { -variable-type }: { -variable-item }. L'elemento da renderizzare, disponibile nello stadio nel loop
snippet-itemTopItem = elemento superiore
    .title = { -variable-type }: { -variable-item }. Il genitore della variabile `elemento`, disponibile nello stadio nel loop
snippet-itemTargetNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota a cui è allegato il template, disponibile a qualsiasi stadio
snippet-itemCopyNoteImage = copia l'immagine della nota
    .title = { -variable-type }: { -variable-function }. Copia l'immagine della nota negli appunti, disponibile a qualsiasi stadio
snippet-itemSharedObj = oggetto condiviso
    .title = { -variable-type }: { -variable-object }. Un oggetto condiviso che può essere usato per memorizzare informazioni attraverso stadi differenti
snippet-itemFieldTitle = titolo
    .title = { -variable-type }: { -variable-string }. Il titolo dell'elemento superiore
snippet-itemFieldAbstract = abstract
    .title = { -variable-type }: { -variable-string }. L'abstract dell'elemento superiore
snippet-itemFieldCitKey = chiave di citazione
    .title = { -variable-type }: { -variable-string }. La chiave di citazione dell'elemento superiore
snippet-itemFieldDate = data
    .title = { -variable-type }: { -variable-string }. La data di pubblicazione dell'elemento superiore
snippet-itemFieldDOI = DOI
    .title = { -variable-type }: { -variable-string }. Il DOI dell'elemento superiore
snippet-itemFieldDOIURL = DOI o URL
    .title = { -variable-type }: { -variable-string }. Il DOI o l'URLdell'elemento superiore
snippet-itemFieldAuthors = autori
    .title = { -variable-type }: { -variable-string }. Gli autori dell'elemento superiore
snippet-itemFieldJournal = rivista
    .title = { -variable-type }: { -variable-string }. La rivista dell'elemento superiore
snippet-itemFieldTitleTranslation = traduzione del titolo
    .title = { -variable-type }: { -variable-string }. La traduzione del titolo dell'elemento superiore
snippet-textTargetNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota bersaglio dell'elemento superiore
snippet-textSharedObj = oggetto condiviso
    .title = { -variable-type }: { -variable-object }. Un oggetto condiviso che può essere usato per memorizzare informazioni
snippet-quickInsertLink = link della nota
    .title = { -variable-type }: { -variable-string }. Il link della nota da collegare
snippet-quickInsertLinkText = testo del link
    .title = { -variable-type }: { -variable-string }. L'etichetta predefinita del link
snippet-quickInsertSubNoteItem = nota collegata
    .title = { -variable-type }: { -variable-note }. La nota a cui puntare il link
snippet-quickInsertNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota a cui allegare il template
snippet-quickImportLink = link della nota
    .title = { -variable-type }: { -variable-string }. Il link della nota da importare
snippet-quickImportNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota a cui allegare il template
snippet-quickNoteAnnotationItem = annotazione
    .title = { -variable-type }: { -variable-annotation }. L'annotazione da convertire in nota
snippet-quickNoteTopItem = elemento superiore
    .title = { -variable-type }: { -variable-item }. L'elemento superiore della variabile `annotationItem`
snippet-quickNoteNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota a cui allegare il template
snippet-exportMDFileNameNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota da esportare
snippet-exportMDFileHeaderNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota da esportare
snippet-exportMDFileContentNoteItem = nota bersaglio
    .title = { -variable-type }: { -variable-note }. La nota da esportare
snippet-exportMDFileContentMDContent = contenuto markdown
    .title = { -variable-type }: { -variable-string }. Il contenuto markdown da esportare
