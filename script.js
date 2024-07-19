


document.addEventListener("DOMContentLoaded",()=>
{
     
    
    
    const taskInput = document.getElementById("new-task");
    const addtaskbutton= document.getElementById("add-task-button");
    const apiurl ="https://jsonplaceholder.typicode.com/todos";
    const tasklist =document.getElementById("task-list");


    addtaskbutton.addEventListener("click",()=>
    {
        let tasktext = taskInput.value.trim();
        
        if(tasktext !== ""){
            addtask(tasktext);
            taskInput.value = "";
        }

    })


    function addtask(tasktext)
    {
          const newtask ={title:tasktext,completed: false};

          fetch(apiurl,{
             method:"POST",
             headers:{"Content-Type":"application/json"},
             body: JSON.stringify(newtask),
          }).then((response)=>response.json()).then((task)=>{
            console.log(task);
            displaytask(task.title,task.id);
          }).catch((error)=>console.error("Failed during task",error));
    }

              function displaytask(title,id)
          {
            const li = document.createElement("li");
            li.setAttribute("data-id",id);
            const spans= document.createElement("span");
            const span = document.createElement("span");
            span.textContent=title;
            const editbtn =document.createElement("button");
            editbtn.textContent="Edit";
            editbtn.className = "edit-btn";

            const editbtntime =document.createElement("button");
            editbtntime.textContent="Edittime";
            editbtntime.className = "edit-btn-time";
            editbtntime.addEventListener("click",()=>edittime(spans));
            editbtn.addEventListener("click",()=>edittask(span,id));

            const deletebtn =document.createElement("button");
            deletebtn.textContent="Delete";
            deletebtn.className = "delete-btn";
            deletebtn.addEventListener("click",()=>deletetask(id,li));


            
           
             const label = document.createElement("label");
            label.class= "cont";
            const input = document.createElement("input");
             input.type="checkbox";
            input.checked="checked";
             const spana = document.createElement("span");
             spana.style.backgroundColor="cyan";
             spana.class="checkmark";
             spana.appendChild(input);
            label.appendChild(spana);
          


             li.appendChild(editbtntime);

             li.appendChild(spans);
            li.appendChild(span);
            li.appendChild(editbtn);
            li.appendChild(deletebtn);
            li.appendChild(label);

            tasklist.appendChild(li);
        }

           

       function edittime(spans){
        const newtext = prompt("Edit Task", spans.textContent);
        spans.textContent = newtext;
       }


                

        function edittask(span, id) {
            const newText = prompt("Edit Task", span.textContent);
            if (newText !== null && newText !== "") {
              const updateTask = { title: newText, completed: false };
              fetch(`${apiurl}/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateTask),
              })
                .then((response) => {
                  console.log(response);
                  if (response.ok === false) {
                    throw new Error("Failed to edit");
                  }
                  return response.json();
                })
                .then(() => {
                  span.textContent = newText;
                })
                .catch((error) => console.error("error in editing task", error));
            }
          }
          
        

        function deletetask(id,li){
                   fetch(`${apiurl}/${id}`,{
                    method:"DELETE",
                   }).then((response)=>{
                        if(response.ok ==true){
                            tasklist.removeChild(li);
                        }
                        else{
                            throw new Error("Failed to delete");
                        }
                   }).catch((error)=>console.error("error in deleting tsk",error));
        }      
              

          
    
})
