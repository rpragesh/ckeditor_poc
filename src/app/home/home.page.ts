import { Component, OnInit } from '@angular/core';
import * as Editor from 'ckeditor5/build/ckeditor'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public CkEditor: any = Editor;
  public editorContent: string = '<h1>Ragesh</h1>';

  // public edi: HTMLElement;
  constructor() {}
  ngOnInit() {
    // You can now safely use this.edi without initializing it in the constructor
}
onReadyChanged(event:any ) {
    let pluginList = this.CkEditor.builtinPlugins.map( (plugin: any) => plugin.pluginName );
    let toolbarList = this.CkEditor.defaultConfig;
     console.log('toolbarList',toolbarList);
    let plugins = pluginList.filter((item: any) => item !== "TextTransformation");
      this.initalizeCkEditor(event,plugins, toolbarList)
   }

   initalizeCkEditor(event: any, pluginList:Array<[]>, EditorConfigList:Array<[]>) {
    let toolbarItems = [];   
    // this.edi = document.getElementById('editorCk');
    // this.editorContent = ''
      toolbarItems = Array.from(event.ui.componentFactory.names());
      console.log('Available toolbar items: ' + JSON.stringify(toolbarItems));
      this.CkEditor.create(document.getElementById('editorCk'), {
         
        initialData: this.editorContent,
        isReadOnly: false,
        plugins: pluginList ,
        EditorConfigList,
        startupFocus : true,
         licenseKey: 'ZUJUSmw1Rm9SdnZKd09TRitmTGZrZzUvU3pFeGZpYUgwWXd5bFZGQWtyWFNCTGlPZE54TjJ3SlRpYlRmLU1qQXlOREF6TXpFPQ==',
        
        editor: {
          on: {
            change: (event:any) => {
              console.log('Editor content changed:', event);
            }
          },
        // tokenUrl: 'https://106101.cke-cs.com/token/dev/29a2e88d8a13ca8049c6f8ea068df4be14e3988c5617b9e96dacc7791345?limit=10'
        }
      }).then((res:any) => {
        //this.edit.focus();
        //  res.setData('<p>Hello, CKEditor!</p>');
        const lockId = 'myLockId';
        // console.log(res.getState(),'res.getState()');
        // -> returns the main root
        res.config._config.isReadOnly = false;
        //disableReadOnlyMode('editorCk');
        const editorContent = res.getData() || '';
        // console.log('Editor content:', editorContent);
        const root = res.model.document.getRoot(); 
        // console.log('root.getRoot();', root);
        // res.document.getBody().setAttribute( 'contenteditable', false );
         
        res.model.document.on('change:data', () => {
          console.log('Editor content changed:', res.getData());
        });
        res.model.change( (writer:any) => {
          writer.insertText( this.editorContent, res.model.document.selection.getFirstPosition() );
        } );
        res.model.document.on('change', (evt:any, data:any) => {
          console.log(evt,'Content changed:', data);
      });
        // console.log('Loaded plugins:', res.plugins.list);
        // console.log('Editor configuration:', res.config._config);
        // console.log('Editor Plugins:', res.config._config.plugins[24].getPluginName());
        console.log('Editor DOM element:', res.ui.element);
        res.ui.element.focus();
        console.log(res.ui._editableElementsMap, '_editableElementsMap');
        const domEditableElement = document.querySelector( '.ck-editor__editable_inline'  );

          this.CkEditor.create(domEditableElement)
          .then((editorInstance:any) => {
            console.log(editorInstance, 'editorInstance');
            editorInstance.setData('hahahaah')
        })
        .catch((error:any) => {
            console.error('Error during initialization of CKEditor', error);
        });
        
      }).catch((err:any) => {
        console.log(err.stack, 'error editor');
      })
  }
}
