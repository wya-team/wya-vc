import './style.scss';

import Quill from 'quill';
import EditorView from './editor-view';
import Editor from './editor';
import ImageExtend from './extends/image-extend';

Editor.View = EditorView;
export default Editor;
export { Quill, ImageExtend };
