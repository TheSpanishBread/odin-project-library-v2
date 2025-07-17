(function ini(){
    //VARIABLES

    const addBook = document.querySelector("#addBook");
    const removeBook = document.querySelector("#removeBook");
    const changeBook = document.querySelector("#changeBook");
    const body = document.querySelector("body");
    let libraryBook = [];
    const libraryBooks = document.querySelector("#libraryBooks");
    //EVENTS
        //Create Form
    addBook.addEventListener("click", () => {
        overlay();
        createForm("Title", "Author", "Pages" , "Read");
    });
        //Delete Book
    removeBook.addEventListener("click", () =>{
        overlay();
        removeBookForm();
    });
        //Change Book Details
    changeBook.addEventListener("click", ()=>{
        overlay();
        changeBookForm();
    });



    //FUNCTIONS
    function changeBookForm(){
        //form container
        let formContainer = document.createElement("form");
        formContainer.id = "formContainer";
        formContainer.classList.add("flexColumn", "formContainer");
        //form fielset
        let formContainerFieldset = document.createElement("fieldset");
        formContainerFieldset.classList.add("flexColumn", "formContainerFieldset");
        //form legend
        let formContainerLegend = document.createElement("legend");
        formContainerLegend.textContent = "Change Book";
        formContainerFieldset.appendChild(formContainerLegend);
        //label element
        let label = document.createElement("label")
        label.textContent = "Select a book to change";
        formContainerFieldset.appendChild(label);
        //create select element
        let select = document.createElement("select");
        select.classList.add("inputSelect");
        select.name = "changeBook";
        //default value
        let optionDefault = document.createElement("option");
        optionDefault.textContent = "Select a book from the list";
        optionDefault.selected = true;
        optionDefault.disabled = true;
        select.appendChild(optionDefault);
        // loop through array of books
        libraryBook.forEach(book => {
            let option = document.createElement("option");
            option.value = book.id;
            option.textContent = book.name + ", by " + book.author; 
            select.appendChild(option);
        });
        //button
        let changeFormSubmit = document.createElement("button");
        changeFormSubmit.id  = "submitButton";
        changeFormSubmit.textContent = "Submit";

        formContainerFieldset.appendChild(select);
        formContainer.appendChild(formContainerFieldset);
        body.appendChild(formContainer);
        //Temporary Events
        select.addEventListener("change", ()=>{
            let resetThis = document.querySelectorAll(".resetThis");
            if (resetThis){
                resetThis.forEach(element => {
                    formContainerFieldset.removeChild(element);         
                });
            }
            
            let selectedBook = libraryBook.filter((book) => book.id == select.value);
            let bookReadorNot = document.createElement("label");
            bookReadorNot.htmlFor = "bookReadorNot";
            bookReadorNot.textContent = "Has " + selectedBook[0].name
                             + " been read?";
            bookReadorNot.classList.add("resetThis");
            let bookReadorNotContainer = document.createElement("div");
            bookReadorNotContainer.classList.add ("flexRow", "resetThis", "changeBookReadOrNotContainer");

            let inputYesLabel = document.createElement("label");
            inputYesLabel.textContent = "Yes";
            let inputYes = document.createElement("input");
            inputYes.type= "radio";
            inputYes.name = "readOrNot";
            inputYes.value = "true";

            let inputNoLabel = document.createElement("label");
            inputNoLabel.textContent = "No";
            let inputNo = document.createElement("input");
            inputNo.type= "radio";
            inputNo.name = "readOrNot";
            inputNo.value = "false";

            if (selectedBook[0].read == "true"){
                 inputYes.checked = true;
            }else{
                inputNo.checked = true;
            }


            formContainerFieldset.appendChild(bookReadorNot);

            bookReadorNotContainer.appendChild(inputYesLabel);
            bookReadorNotContainer.appendChild(inputYes);
            bookReadorNotContainer.appendChild(inputNoLabel);
            bookReadorNotContainer.appendChild(inputNo);    
            formContainerFieldset.appendChild(bookReadorNotContainer);

            formContainerFieldset.appendChild(changeFormSubmit);

            //if butt
            changeFormSubmit.addEventListener("click", (e)=>{
                e.preventDefault();
                let overlay = document.querySelector("#overlay");
                let formContainer = document.querySelector("#formContainer")
                
                let newSelect = document.querySelector("input[name='readOrNot']:checked");
                let index = libraryBook.findIndex(book => book.id === select.value);
                libraryBook[index].read = newSelect.value;
                

                console.log(libraryBook);
                body.removeChild(overlay);
                body.removeChild(formContainer);
            });
        });

    }
    function removeBookForm(){
        //form Container
            let formContainer = document.createElement("form");
            formContainer.id = "formContainer";
            formContainer.classList.add("flexColumn", "formContainer");

            let formContainerFieldset = document.createElement("fieldset");
            formContainerFieldset.classList.add("flexColumn", "formContainerFieldset");

            let formContainerLegend = document.createElement("legend");
            formContainerLegend.textContent = "Remove Book";

            formContainerFieldset.appendChild(formContainerLegend);
            let label = document.createElement("label")
            label.textContent = "Select a book to remove";
            formContainerFieldset.appendChild(label);

            let inputSelect = document.createElement("select");
            inputSelect.classList.add("inputSelect");
            inputSelect.name = "removeBook";
            
            let optionDefault = document.createElement("option");
            optionDefault.textContent = "Select a book from the list";
            optionDefault.selected = true;
            optionDefault.disabled = true;
            inputSelect.appendChild(optionDefault);
        //add to loop through the array;
            libraryBook.forEach(book => {
                let option = document.createElement("option");
                option.value = book.id;
                option.textContent = book.name + ", by " + book.author; 
                inputSelect.appendChild(option);
            });
        //button
            let removeFormSubmit = document.createElement("button");
            removeFormSubmit.id  = "submitButton";
            removeFormSubmit.textContent = "Submit";

        //append
            formContainerFieldset.appendChild(inputSelect);
            formContainerFieldset.appendChild(removeFormSubmit);
            formContainer.appendChild(formContainerFieldset);
            body.appendChild(formContainer);
        //Temporary Events
            removeFormSubmit.addEventListener("click", (e)=>{
                e.preventDefault();
                let overlay = document.querySelector("#overlay");
                let formContainer = document.querySelector("#formContainer")
                //start removingher

                libraryBook = libraryBook.filter((book) => book.id !== inputSelect.value);
                let removeBookfromCase = document.querySelectorAll(".libraryBookStyle");
                removeBookfromCase.forEach(individualBook => {
                    if (individualBook.dataset.id == inputSelect.value){
                        libraryBooks.removeChild(individualBook);
                    }
                });

                console.log(libraryBook);
                body.removeChild(overlay);
                body.removeChild(formContainer);
            });
    }
    function overlay(){
        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.id = "overlay";
        body.appendChild(overlay);
    }

    function createForm(...array){
        //START
        //1. form Container
            let formContainer = document.createElement("form");
            formContainer.id = "formContainer";
            formContainer.classList.add("flexColumn", "formContainer");

            let formContainerFieldset = document.createElement("fieldset");
            formContainerFieldset.classList.add("flexColumn", "formContainerFieldset");

            let formContainerLegend = document.createElement("legend");
            formContainerLegend.textContent = "Enter Book Details";

            formContainerFieldset.appendChild(formContainerLegend);
        //2. form fields 
        for (let i = 0; i<=3 ;i++){
            let inputContainer = document.createElement("div");
            inputContainer.classList.add("flexColumn", "inputContainer") 

            let label = document.createElement("label");
            label.htmlFor = "book" + array[i];
            label.textContent = "Book " + array[i] + " :";

            let input = document.createElement("input");
            

            input.classList.add("bookNewInput");
            if (i!=3){
            input.type = "text";
            input.placeholder = "Enter Book " + array[i] + "...";
            input.id = "book" + array[i];
            input.required = true;

            inputContainer.appendChild(label);
            inputContainer.appendChild(input);
            formContainerFieldset.appendChild(inputContainer);
            }
            else{
                label.textContent = "Have you read this book? : "

                let readOrNotContainer = document.createElement("div");
                readOrNotContainer.classList.add("flexRow", "readOrNotContainer");

                let readTrueLabel = document.createElement("label");
                readTrueLabel.htmlFor = "readTrueLabel";
                readTrueLabel.textContent = "Yes"
                input.type = "radio";
                input.value =  "true";
                input.name = "readOrNot";
                input.checked = true;

                let input1 = document.createElement("input");
                input1.classList.add("bookNewInput");

                let readFalseLabel = document.createElement("label");
                readFalseLabel.htmlFor = "readFalseLabel";
                readFalseLabel.textContent = "No"
                input1.type = "radio";
                input1.value =  "false";
                input1.name = "readOrNot";

                inputContainer.appendChild(label);
                readOrNotContainer.appendChild(input);
                readOrNotContainer.appendChild(readTrueLabel);
                readOrNotContainer.appendChild(input1);
                readOrNotContainer.appendChild(readFalseLabel);
                inputContainer.appendChild(readOrNotContainer);
                formContainerFieldset.appendChild(inputContainer);

            }


        }
        //3. create submit burron
            let submitForm = document.createElement("button");
            submitForm.id  = "submitButton";
            submitForm.textContent = "Submit";

        //Temporary Functions 
        
            function bookRegister(bookID, bookNewInputs){
                this.id = bookID;
                this.name = bookNewInputs[0].value;
                this.author = bookNewInputs[1].value;
                this.pages = bookNewInputs[2].value;
                let checkedRadio = document.querySelector('input[name="readOrNot"]:checked');
                this.read = checkedRadio.value;
            }
        //Temporary Events
            //If Submit is clicked 
            submitForm.addEventListener("click", (e) =>{
                e.preventDefault();
                let overlay = document.querySelector("#overlay");
                let formContainer = document.querySelector("#formContainer")
                let bookID = crypto.randomUUID();
                let bookNewInputs = document.querySelectorAll(".bookNewInput");  
                let newBook = new bookRegister(bookID, bookNewInputs);

                libraryBook.push(newBook);

                let libraryBookStyle  = document.createElement("div");
                libraryBookStyle.dataset.id = bookID;
                libraryBookStyle.classList.add("libraryBookStyle");
                libraryBookStyle.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + 
                "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"; 
                
                libraryBooks.appendChild(libraryBookStyle);
                body.removeChild(overlay);
                body.removeChild(formContainer);
                console.log(libraryBook);
            });

        //APPEND TO BODY
        formContainerFieldset.appendChild(submitForm);
        formContainer.appendChild(formContainerFieldset);
        body.appendChild(formContainer);

    }
    


}

)();