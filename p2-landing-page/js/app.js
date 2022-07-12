/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sectionNavs = document.querySelectorAll("section");
let NavTag = document.getElementById("navbar__list");





/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function scrollToSection(sectionID) {
	window.scrollTo({left:0, top:sectionID, behavior: 'smooth'});
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// 1.build the nav
sectionNavs.forEach((element,index)=>{
    let sectionName=element.getAttribute("data-nav");
    let toOffSection=element.offsetTop+50;
    let liTag=document.createElement('li');
    liTag.setAttribute("class","nav"+index);
    liTag.innerHTML=`<a onClick="scrollToSection(${toOffSection})">${sectionName}</a>`;
    NavTag.appendChild(liTag)
    console.log(sectionName)
})

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


