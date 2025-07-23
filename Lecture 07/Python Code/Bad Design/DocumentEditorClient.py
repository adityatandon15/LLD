import os

class DocumentEditor:
    def __init__(self):
        self.document_elements = []
        self.rendered_document = ""

    # Adds text as a plain string
    def add_text(self, text):
        self.document_elements.append(text)

    # Adds an image represented by its file path
    def add_image(self, image_path):
        self.document_elements.append(image_path)

    # Renders the document by checking the type of each element at runtime
    def render_document(self):
        if not self.rendered_document:
            result = []
            for element in self.document_elements:
                if len(element) > 4 and (element.endswith(".jpg") or element.endswith(".png")):
                    result.append(f"[Image: {element}]")
                else:
                    result.append(element)
            self.rendered_document = "\n".join(result)
        return self.rendered_document

    # Saves the rendered document to a file
    def save_to_file(self):
        try:
            with open("document.txt", "w") as writer:
                writer.write(self.render_document())
            print("Document saved to document.txt")
        except IOError:
            print("Error: Unable to open file for writing.")

class DocumentEditorClient:
    @staticmethod
    def main():
        editor = DocumentEditor()
        editor.add_text("Hello, world!")
        editor.add_image("picture.jpg")
        editor.add_text("This is a document editor.")

        print(editor.render_document())

        editor.save_to_file()

if __name__ == "__main__":
    DocumentEditorClient.main()