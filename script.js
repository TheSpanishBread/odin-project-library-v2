(() => {
    const DOMVariables = { 
        body : document.querySelector("body"),
        libraryBooks : document.querySelector("#libraryBooks"),
        addBook : document.querySelector("#addBook"),
        removeBook : document.querySelector("#removeBook"),
        changeBook : document.querySelector("#changeBook"),
    }
    const libraryVariables = {
        libraryBook : [],
    }
    const UIMethods = {
        overlay(){
            let overlay = document.createElement("div");
            overlay.classList.add("overlay");
            overlay.id = "overlay";
            DOMVariables.body.appendChild(overlay);
        },
        removeFormOverlay(){
            DOMVariables.body.removeChild(document.querySelector("#formContainer"));
            DOMVariables.body.removeChild(document.querySelector("#overlay"));
        },
        bookToShelft(newBook){
            let libraryBookStyle  = document.createElement("div");
            libraryBookStyle.dataset.id = newBook.id;
            libraryBookStyle.classList.add("libraryBookStyle");
            libraryBookStyle.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + 
            "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
            DOMVariables.libraryBooks.appendChild(libraryBookStyle);  
        },
        bookHoverUI(bookDetails, bookDiv, id){
            let hoverContainer = document.createElement("div");
            hoverContainer.classList.add("hoverContainer", "flexColumn");
            hoverContainer.id = "details"+id;
            
            for(let i = 0; i<=4;i++){
                let hoverEntry = document.createElement("p");
                hoverEntry.textContent = bookDetails[i];
                hoverContainer.appendChild(hoverEntry);
            }
            bookDiv.appendChild(hoverContainer);
        },
        removeBook(){
            let book = document.querySelector("select[name='removeBook']").value;
            let booktoRemove = document.querySelector("[data-id='" + book + "']");
            DOMVariables.libraryBooks.removeChild(booktoRemove);

        }
    }
    const formMethods = {
        createForm(promptMessage){
            let formContainer = document.createElement("form");
            formContainer.id = "formContainer";
            formContainer.classList.add("flexColumn", "formContainer");

            let formContainerFieldset = document.createElement("fieldset");
            formContainerFieldset.classList.add("flexColumn", "formContainerFieldset");
            formContainerFieldset.id = "formContainerFieldset"

            let formContainerLegend = document.createElement("legend");
            formContainerLegend.textContent = promptMessage;

            formContainerFieldset.appendChild(formContainerLegend); 
            formContainer.appendChild(formContainerFieldset);
            DOMVariables.body.appendChild(formContainer);
        },
        submitButton(){
            let submitForm = document.createElement("button");
            submitForm.id  = "submitButton";
            submitForm.textContent = "Submit";
            document.querySelector("#formContainerFieldset").appendChild(submitForm);

        },
        createFormItems(array){
            for(let i=0 ; i <=((array.length)-1); i++){
                let inputContainer = document.createElement("div");
                inputContainer.classList.add("flexColumn", "inputContainer") 
                document.querySelector("#formContainerFieldset").appendChild(inputContainer); 

                let label = document.createElement("label");
                label.textContent = "Book " + array[i];
                label.htmlFor = "book"+array[i];
                inputContainer.appendChild(label); 

                let input = document.createElement("input");
                input.type = "text";
                input.id = "book" + array[i];
                input.placeholder  = "Enter book " + array[i] + " ...";
                input.classList.add("bookNewInput");
                inputContainer.appendChild(input); 
            }
        },
        createRadioItems(promptMessage, array){
            let inputContainer = document.createElement("div");
            inputContainer.classList.add("flexRow", "readOrNotContainer");            
            document.querySelector("#formContainerFieldset").appendChild(inputContainer); 

            let label = document.createElement("label");
            label.textContent = promptMessage;
            inputContainer.appendChild(label);

            for(let i = 0 ; i <=(array.length-1) ; i++){
                let input = document.createElement("input");
                input.type = "radio";
                input.id = "read" + array[i];
                input.name = "readOrNot";
                input.value = array[i];
                inputContainer.appendChild(input);

                let label = document.createElement("label");
                label.htmlFor = "read" + array[i];
                if (array[i] == "true"){
                    label.textContent = "Yes";
                }else{
                    label.textContent = "No";
                }
                inputContainer.appendChild(label);
            }
            
        },
        createSelect(name){
            let select = document.createElement("select");
            select.name = name;
            document.querySelector("#formContainerFieldset").appendChild(select); 
            let optionDefault = document.createElement("option");
            optionDefault.textContent = "Select a book from the list";
            optionDefault.selected = true;
            optionDefault.disabled = true;
            optionDefault.value = "";
            select.appendChild(optionDefault);
            libraryVariables.libraryBook.forEach(book => {
                let option = document.createElement("option");
                option.value = book.id;
                option.textContent = book.title + ", by " + book.author; 
                select.appendChild(option);
            });
        },
        deleteBook(){
            let index = libraryVariables.libraryBook.findIndex(obj => obj.id === 
                document.querySelector("select[name='removeBook']").value
            );
            if (index !== -1){
                libraryVariables.libraryBook.splice(index,1);
                console.log(libraryVariables.libraryBook);
            }
        },
        changeBook(){

        }
    }
    class CreateBook{
        constructor(){
            this.id = crypto.randomUUID();
            this.title = document.querySelector("#bookTitle").value;
            this.author = document.querySelector("#bookAuthor").value;
            this.pages = document.querySelector("#bookPages").value;
            this.read = document.querySelector('input[name="readOrNot"]:checked').value;
        }
        
        //add a method if hovered will display book details
        bookHover(){
            const bookDiv = document.querySelector("[data-id='" + this.id + "']");
            if (bookDiv) {
                bookDiv.addEventListener("mouseover", () => {
                    let bookDetails = [
                     ("Book ID: " + this.id),
                     ("Book Title: " + this.title),
                     ("Book Author: " + this.author),
                     ("Book Pages: " + this.pages),
                     ("Has been read?: " + this.read)
                    ]
                    UIMethods.bookHoverUI(bookDetails, bookDiv, this.id);
                });
                bookDiv.addEventListener("mouseout", () => {
                    let detailsUI = document.querySelector("#details"+this.id);
                    bookDiv.removeChild(detailsUI);
                });
            }
        }
    
        //setter getter
    }
    const action = {
        events(){
            DOMVariables.addBook.addEventListener("click", () =>{
                UIMethods.overlay();
                formMethods.createForm("Enter Book Details");
                formMethods.createFormItems(["Title", "Author", "Pages"]);
                formMethods.createRadioItems("Have you read this book?", ["true", "false"] );
                formMethods.submitButton();
                document.querySelector("#submitButton").addEventListener("click", (e)=>{
                    e.preventDefault();
                    let newBook = new CreateBook();
                    libraryVariables.libraryBook.push(newBook);
                    console.log(libraryVariables.libraryBook);
                    UIMethods.bookToShelft(newBook);
                    newBook.bookHover();
                    console.log(CreateBook.prototype.bookHover);
                    UIMethods.removeFormOverlay();
                })
                });
            DOMVariables.removeBook.addEventListener("click", () =>{
                UIMethods.overlay();
                formMethods.createForm("Select Book to Remove:");
                formMethods.createSelect("removeBook");
                formMethods.submitButton();
                document.querySelector("#submitButton").addEventListener("click", (e)=>{
                    e.preventDefault();
                    formMethods.deleteBook();
                    UIMethods.removeBook();
                    UIMethods.removeFormOverlay();
                });
            });
            DOMVariables.changeBook.addEventListener("click", () =>{
                UIMethods.overlay();
                formMethods.createForm("Select Book to Change:");
                formMethods.createSelect("changeBook");
                (document.querySelector("select[name='changeBook']")).addEventListener("change", ()=>{
                    if (document.querySelector("#submitButton")){
                        let button = document.querySelector("#submitButton");
                        document.querySelector("#formContainerFieldset").removeChild(button);
                    }
                    formMethods.createRadioItems("Have you read this book?", ["true", "false"] );
                    formMethods.submitButton();
                    document.querySelector("#submitButton").addEventListener("click", (e)=>{
                        e.preventDefault();
                        let readOrNot = document.querySelector('input[name="readOrNot"]:checked').value;
                        let selectedBook = document.querySelector("select[name='changeBook']").value;
                        let index = libraryVariables.libraryBook.findIndex(obj => obj.id === selectedBook );
                        libraryVariables.libraryBook[index].read = readOrNot;

                        UIMethods.removeFormOverlay();
                });
                });                
                console.log(libraryVariables.libraryBook);
            });
            
            }
            ///remove

            ///change

    }

    action.events();




})();