import { Plugin } from "ckeditor5/src/core";
import createButtonView from "./buttonView";

export default class TextToTextGeneration extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("textToTextGeneration", (locale) => {
      const view = createButtonView(locale, editor);
      return view;
    });
  }
}
