(async function (){
    const employee_data = await fetch("./data.json");
    let employee_data_json = await employee_data.json();


    const  div_employee_all_list = document.querySelector(".employee_all_list");
    const  div_employee_single_info = document.querySelector(".employee_single_info");
    const addEmp_btn = document.querySelector(".createEmp");
    const addEmp_div = document.querySelector(".addEmployee");
    const addEmployee_create_form = document.querySelector(".addEmployee_create");
    const addEmployee_create__submit = document.querySelector(".addEmployee_create--submit");


     let SelectedEmployeeId = employee_data_json[0].id // this employee_data_json[0].id this just for initalization 
     

    div_employee_all_list.addEventListener("click",(event)=>{
        if(event.target.tagName == "SPAN")
            {
                SelectedEmployeeId = event.target.id;
                renderSingleEmployee();
            }
        if(event.target.tagName === "I")
            {
               
                let Data_after_delete =  employee_data_json.filter((obj)=> String(obj.id) !== event.target.parentNode.id);
                employee_data_json = Data_after_delete;
                renderEmployees();
            }    

    })

    const renderSingleEmployee = ()=>{
        let  id = SelectedEmployeeId;
        div_employee_single_info.innerHTML = "";
        let [empObj] = employee_data_json.filter((obj)=>obj.id == id);
        div_employee_single_info.innerHTML = `
        <img src = "${empObj.imageUrl}" class = "employee__single__Photo"></img> 
        <p> Name : ${empObj.firstName} ${empObj.lastName}</p>
        <p> Email : ${empObj.email} </p>
        <p> Contact Number : ${empObj.contactNumber} </p>
        <p> Salary : ${empObj.salary} </p>
        <p> DOB : ${empObj.dob} </p>
        <p> Age : ${empObj.age} </p>
        <p> Address : ${empObj.address} </p>`;

    }
    renderSingleEmployee(); 


    const renderEmployees = ()=>{
         div_employee_all_list.innerHTML = "";
         employee_data_json.forEach(emp => {
            const employeeSpan = document.createElement("span");
            employeeSpan.classList.add("employee_all_list_items");
            employeeSpan.id = emp.id;
            employeeSpan.innerHTML = `${emp.firstName  }${emp.lastName}<i class = "emeployeeDelete">⚔️</i>`
            
            div_employee_all_list.appendChild(employeeSpan);
            
            
            
         });
    }

    renderEmployees();

    addEmp_btn.addEventListener("click",(event)=>{
        addEmp_div.style.display = "flex";

        
    })

    addEmp_div.addEventListener("click",(event)=>{
        if(event.target.className === "addEmployee"){
            
            addEmp_div.style.display = "none";
            
        }

    })

    addEmployee_create_form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const formdata = new FormData(addEmployee_create_form);
        let values = [...formdata.entries()]

        let empData = {};
        empData["id"] = employee_data_json[employee_data_json.length-1].id +1;
        empData["imageUrl"] = "https://cdn-icons-png.flaticon.com/512/0/93.png"

        values.forEach((val)=>{
            empData[val[0]] = val[1];
        })
        console.log(empData);
        employee_data_json.push(empData);
        renderEmployees();
        addEmployee_create_form.reset();
        

    })

})()