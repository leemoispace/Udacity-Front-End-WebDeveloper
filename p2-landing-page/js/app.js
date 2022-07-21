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
const sectionNavs = document.querySelectorAll("section");
const navTag = document.getElementById("navbar__list");
const sectionNavLength = sectionNavs.length;

// 1.Build the nav get position info array
sectionNavs.forEach((element, index) => {
  const sectionName = element.getAttribute("data-nav");
  const scrollTarget = element.offsetTop;
  const liTag = document.createElement("li");
  liTag.setAttribute("class", "nav" + index);
  liTag.innerHTML = `<a onClick="scrollToTargets(${scrollTarget})">${sectionName}</a>`;
  navTag.appendChild(liTag);
});

// 2.Scroll to targets ID using scrollTO event
function scrollToTargets(scrollTarget) {
  window.scrollTo({ left: 0, top: scrollTarget, behavior: "smooth" });
}

// 3.Add class 'active' to section when near top of viewport
document.addEventListener("scroll", () => {
  const sectionNavPositions = [];
  // update all navs positions for every pixal scroll,
  // before the +50 is my test for the boundary conditions.test for the boundary changing moments considering the nav bar height.if dont need to control that accurate the experience dont differ.
  sectionNavs.forEach((element) =>
    sectionNavPositions.push(element.getBoundingClientRect().top)
  );
  const addIndex = sectionNavPositions.findIndex((element) => element > 0);
  for (let i = 0; i < sectionNavLength; i++) {
    if (addIndex === i) {
      document.querySelector(".nav" + addIndex).classList.add("active");
      document
        .querySelector(`#section${addIndex + 1}`)
        .classList.add("current-active-class");
    } else {
      document.querySelector(".nav" + i).classList.remove("active");
      document
        .querySelector(`#section${i + 1}`)
        .removeAttribute("current-active-class");
    }
  }
});

// findIndex can solve below, below codes not useful.just keep a record.
// currentPosition = this.scrollY;
// // moving window to find find which section r we in
// allSectionPositions=[0,...sectionNavPositions,document.body.scrollHeight];
// while(currentPosition>allSectionPositions[currentPositionIndex]){
//     currentPositionIndex++;
//     if(currentPosition<allSectionPositions[currentPositionIndex]){
//         document.querySelector(".nav" + parseInt(currentPositionIndex-1)).classList.add("active");
// 		//document.querySelector(`#section${currentPositionIndex + 1}`).classList.add("current-active-class");
//         break;
