const addbox = document.querySelector(".add-box");
const newpop = document.querySelector(".newpop");
const closebtn = newpop.querySelector("header i");
const addbtn = newpop.querySelector(" button");
const title = newpop.querySelector("input ");
const descrip = newpop.querySelector("textarea");
let notes =JSON.parse(localStorage.getItem("notes" )) || [] ;//getting nd parsing from local storage if any 
// console.log(notes);
let if_update=false,update_index;
const notesContainer = document.querySelector(".notes-list");
const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];


  document.addEventListener("DOMContentLoaded", function () {
    // Function to display username
    function displayUsername() {
        const storedUsername = localStorage.getItem('username'); // Retrieve username from local storage
        const userNameDisplay = document.getElementById('user-name'); // Get the element to display the username
        
        if (storedUsername) { // Check if username exists
            userNameDisplay.innerText = `Welcome, ${storedUsername}`; // Display the username
        } else {
            userNameDisplay.innerText = ''; // Clear if no username
        }
    }

    // Call the displayUsername function to show the username on load
    displayUsername();
});


// //----------------------------------
// document.getElementById('logout-button').addEventListener('click', function() {
//     localStorage.removeItem('username');
//     // const storedUsername = localStorage.getItem('username');
    
  
//     displayUsername();
// });

// function displayUsername() {
//     const storedUsername = localStorage.getItem('username');
//     const userNameDisplay = document.getElementById('user-name');
// //show logout button when user is logged in
// //don't show log out button when not logged in
// if (storedUsername)//i.e. logged in
//      {
//         userNameDisplay.innerText = `Welcome, ${storedUsername}`; 
//         document.getElementById('logout-button').classList.remove('hidden');
//     } else {
//         userNameDisplay.innerText = '';
//         document.getElementById('logout-button').classList.add('hidden');
//     }
// }
// //fired when all dom contents+other resources have been loaded making sure they are accessible
// window.onload = function() {
//     displayUsername();
   
// };






//------------------
addbox.addEventListener("click", () => {
   console.log("clicked!");
//    poptitle.innerHTML="Add a new note";
    newpop.classList.add("show");
});


closebtn.addEventListener("click",()=>{
    title.value = "";
    descrip.value = "";
    addbtn.innerHTML="Add  note";
    poptitle.innerHTML="Add a new note";
newpop.classList.remove("show");
    
});


shownotes();


function shownotes(){
    // notesContainer.innerHTML = "";
    notes.forEach((note,index) => {
        // console.log(note.dateinfo);

        let listtag = '<li class="note">' +
        '<div class="details">' +
            '<p>' + note.title + '</p>' +
            '<span>' + note.description + '</span>' +
        '</div>' +
        '<div class="bottom-content">' +
            '<span>' + note.dateinfo + '</span>' +
            '<div class="settings">' +
                '<i class="uil uil-ellipsis-h"></i>' +
                '<ul class="menu">' +
                    '<li onclick="edit(' + index + ', \'' + note.title + '\', \'' + note.description + '\')">' +
                        '<i class="uil uil-pen"></i>edit</li>' +
                    '<li onclick="deletenote(' + index + ')">' +
                        '<i class="uil uil-trash"></i>delete</li>' +
                
                        "<li onclick='showbgoptions(" + index + ")'>" +
                        "<i class='uil uil-image'></i>Change" +
                    "</li>" +
                        '</ul>' +
            '</div>' +
            // '<button class="change-bg" onclick="showBgOptions(' + index + ')">Change Background</button>' +
            // '<div class="bg-options" id="bg-options-' + index + '" style="display: none;"></div>' +
        '</div>' +
    '</li>';


    addbox.insertAdjacentHTML('afterend',listtag);

        
    });
   
 }


 function addSingleNote() {
    lastIndex=notes.length - 1;
    const note = notes[lastIndex]; 

    let listtag = '<li class="note">' +
        '<div class="details">' +
            '<p>' + note.title + '</p>' +
            '<span>' + note.description + '</span>' +
        '</div>' +
        '<div class="bottom-content">' +
            '<span>' + note.dateinfo + '</span>' +
            '<div class="settings">' +
                '<i class="uil uil-ellipsis-h"></i>' +
                '<ul class="menu">' +
                    '<li onclick="edit(' + lastIndex + ', \'' + note.title + '\', \'' + note.description + '\')">' +
                        '<i class="uil uil-pen"></i>Edit</li>' +
                    '<li onclick="deletenote(' + lastIndex + ')">' +
                        '<i class="uil uil-trash"></i>Delete</li>' +
                    "<li onclick='showbgoptions(" + lastIndex + ")'>" +
                        "<i class='uil uil-image'></i>Change</li>" +
                '</ul>' +
            '</div>' +
        '</div>' +
    '</li>';
    
   addbox.insertAdjacentHTML('afterend', listtag);
}








//background change-----

function showbgoptions(index)
{

    const backgrounds = [
        'url1.jpg',
        'url2.jpg',
       
    ];

    backgrounds.forEach(function(bg) {
        const newdiv = document.createElement('div');
        newdiv.classList.add('background-option');//new class added
        newdiv.addEventListener('click', function() {
            changeBackground(index, bg);
        });

 

    }
)
}





const poptitle=newpop.querySelector("header p");


function edit(indexx,tit,descri){

    if_update=true;
    // addbox.addEventListener("click",function(){
   
        update_index=indexx;
      

title.value = tit;    
    descrip.value = descri;
//in order to update the edit date everytime,we'll have to make changes to the date info of notes.THUS=>
    let dateobj = new Date();
let month = months[dateobj.getMonth()];
let day = dateobj.getDate();
let year = dateobj.getFullYear();
notes[update_index].dateinfo = month + " " + day + " " + year;

    addbtn.innerHTML="complete editing";
poptitle.innerHTML="Update Note";
newpop.classList.add("show");
}




// problem-deletion done bt visible after being refreshed only
 function deletenote(indexx){
    
    let confirmdel=confirm("ARE YOU SURE YOU WANT TO DELETE THIS NOTE?");
if(!confirmdel)
    return;//return back ig do not want to delete
    console.log(indexx);
    notes.splice(indexx,1);//index of element,no od element
    localStorage.setItem("notes",JSON.stringify(notes));
    shownotes();

}

//problem-do we need to prevent the form from submitting,else what happens?
addbtn.addEventListener("click", () => {
   
    console.log("clicked!");
    let notetitle=title.value;
    let notedescrip=descrip.value;
    if(notetitle || notedescrip){
        // console.log(ans);
        let dateobj=new Date();
        let month=months[dateobj.getMonth()];
        let day=dateobj.getDate();
        let year=dateobj.getFullYear();

let info={
   title:notetitle,
   description:notedescrip,
   dateinfo:month+" "+day+" "+year,
   backgroundimage:''//empty

};

if (!if_update) {
    notes.push(info);
    localStorage.setItem("notes", JSON.stringify(notes));
    addSingleNote(); // Only add the last note for new notes
} else {
    notes[update_index] = info;
    if_update = false;
    localStorage.setItem("notes", JSON.stringify(notes));

     // Clear all to prevent duplication
    shownotes(); // Re-render all 
}

title.value = "";
descrip.value = "";
newpop.classList.remove("show");

}


 });

 const themeToggle = document.getElementById('theme-toggle');
 const body = document.body;//would be changinf the styling of body elements

 if (localStorage.getItem('theme') === 'dark') {
    //applying the dark theme
    body.classList.add('dark-theme');//add dark theme class
    themeToggle.innerHTML = '<i class="uil uil-sun"></i>'; // Change to sun icon 

} else {
    themeToggle.innerHTML = '<i class="uil uil-moon"></i>';
}

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) 
            {
            themeToggle.innerHTML = '<i class="uil uil-sun"></i>'; // Sun icon for dark mode
            localStorage.setItem('theme', 'dark');
        } else 
        {
     themeToggle.innerHTML = '<i class="uil uil-moon"></i>'; // Moon icon for light mode
     localStorage.setItem('theme', 'light');
    }


 });
 //-----------------------------------------------------------






  
 
