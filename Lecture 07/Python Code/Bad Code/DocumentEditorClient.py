class DocumentEditor:
    def __init__(self):
        self.documentElements = []
        self.renderedDocument = ""

    # Adds text as a plain string
    def addText(self, text):
        self.documentElements.append(text)

    # Adds an image represented by its file path
    def addImage(self, imagePath):
        self.documentElements.append(imagePath)

    # Renders the document by checking the type of each element at runtime
    def renderDocument(self):
        if not self.renderedDocument:
            result = []
            for element in self.documentElements:
                if (
                    len(element) > 4
                    and (element.endswith(".jpg") or element.endswith(".png"))
                ):
                    result.append(f"[Image: {element}]\n")
                else:
                    result.append(f"{element}\n")
            self.renderedDocument = "".join(result)
        return self.renderedDocument

    def saveToFile(self):
        try:
            with open("document.txt", "w") as writer:
                writer.write(self.renderDocument())
            print("Document saved to document.txt")
        except IOError:
            print("Error: Unable to open file for writing.")


class DocumentEditorClient:
    @staticmethod
    def main():
        editor = DocumentEditor()
        editor.addText("Hello, world!")
        editor.addImage("picture.jpg")
        editor.addText("This is a document editor.")

        print(editor.renderDocument())

        editor.saveToFile()


if __name__ == "__main__":
    DocumentEditorClient.main()
