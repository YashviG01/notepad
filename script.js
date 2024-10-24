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
                        "<i class='uil uil-image'></i>Change Background" +
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

// function changeBackground(index, imageUrl) {
//     notes[index].backgroundImage = imageUrl; 
//     localStorage.setItem("notes", JSON.stringify(notes)); // Update local storage
//     shownotes(); //display fresh now


// }





const poptitle=newpop.querySelector("header p");


function edit(indexx,tit,descri){

    if_update=true;
    addbox.click();
    update_index=indexx;
    
    title.value = tit;
    descrip.value = descri;//trigger any click eventlistener added on addbox
//in order to update the edit date everytime,we'll have to make changes to the date info of notes.THUS=>
    let dateobj = new Date();
let month = months[dateobj.getMonth()];
let day = dateobj.getDate();
let year = dateobj.getFullYear();
notes[update_index].dateinfo = month + " " + day + " " + year;

    addbtn.innerHTML="complete editing";
poptitle.innerHTML="Update Note";

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
    // let ans=notetitle || notedescrip;
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
if(!if_update)//check if any update
{
    notes.push(info);//no update,add new
}

else
{ if_update=false;//otherwise prev updated note replaced by new
    notes[update_index]=info;//update 
}
// console.log(notes);
localStorage.setItem("notes", JSON.stringify(notes));

//so that the fields are empty next time you open them
// newpop.classList.remove("show");
shownotes(); 

// console.log("pushed into local storage");// console.log(month,day,year);


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






  
 
