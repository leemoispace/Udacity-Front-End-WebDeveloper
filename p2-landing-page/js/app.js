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
let sectionNavPositions=[];
let sectionNavLength = sectionNavs.length;

// 1.build the nav get position info array
sectionNavs.forEach((element,index)=>{
    let sectionName=element.getAttribute("data-nav");
    let scrollTarget=element.offsetTop;
    let liTag=document.createElement('li');
    liTag.setAttribute("class","nav"+index);
    liTag.innerHTML=`<a onClick="scrollToSection(${scrollTarget})">${sectionName}</a>`;
    NavTag.appendChild(liTag);
})

// 2.Scroll to anchor ID using scrollTO event
function scrollToSection(sectionID) {
	window.scrollTo({left:0, top:sectionID, behavior: 'smooth'});
}

// 3.Add class 'active' to section when near top of viewport
document.addEventListener("scroll", () => {
	sectionNavPositions = [];
	sectionNavs.forEach((element) => sectionNavPositions.push(element.getBoundingClientRect().top+50));
	let addIndex = sectionNavPositions.findIndex((element) => element > 0);
	for (let i = 0; i < sectionNavLength; i++) {
		if (addIndex === i) {
			document.querySelector(".nav" + addIndex).classList.add("active");
			document.querySelector(`#section${addIndex + 1}`).classList.add("current-active-class");
		} else {
			document.querySelector(".nav" + i).classList.remove("active");
			document.querySelector(`#section${i + 1}`).removeAttribute("current-active-class");
		}
	}
});

    // findIndex can solve below 
    // currentPosition = this.scrollY;
    // // moving window to find find which section r we in
    // allSectionPositions=[0,...sectionNavPositions,document.body.scrollHeight];
    // while(currentPosition>allSectionPositions[currentPositionIndex]){
    //     currentPositionIndex++;
    //     if(currentPosition<allSectionPositions[currentPositionIndex]){
    //         document.querySelector(".nav" + parseInt(currentPositionIndex-1)).classList.add("active");
	// 		//document.querySelector(`#section${currentPositionIndex + 1}`).classList.add("current-active-class");
    //         break;
