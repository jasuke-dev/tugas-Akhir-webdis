function init() {
    const pages = document.querySelectorAll(".page");
    const navs = document.querySelectorAll(".nav");
    let count=0;

    //tracker
    let current = 0;
    let scrollSlide = 0;

    navs.forEach((nav,index)=>{
        nav.addEventListener("click",function() {
            changeNav(this);
            changePage(index);
            scrollSlide = index;
        });
    });

    function changeNav(nav){
        navs.forEach(nav=>{
            nav.classList.remove("active");
        });
        nav.classList.add("active");
    }

    function changePage(pageNumber){
        const changePage = pages[pageNumber];
        const currentPage = pages[current];
        const changeContent = changePage.querySelector(".content");
        const currentContent = currentPage.querySelector(".content");
        const changeJudul = changePage.querySelector(".utama");
        const currentJudul = currentPage.querySelector(".utama");
        const changeket = changePage.querySelector(".keterangan");
        const currentket = currentPage.querySelector(".keterangan");

        const tl = new TimelineMax({
            onStart: function(){
                navs.forEach(nav=>{
                    nav.style.pointerEvents = "none";
                });
            },
            onComplete:function(){
                navs.forEach(nav=>{
                    nav.style.pointerEvents = "all";
                });
            }
        })

        tl.fromTo(currentContent, 0.3, {x:"0%",opacity:1},{x:"60%",opacity:0})
        .fromTo(currentJudul, 0.3, {y:"0%", opacity:1}, {y:"-50%",opacity:0}, "-=0.1")
        .fromTo(currentket, 0.3, {y:"0%",opacity:1}, {y:"-50%", opacity:0}, "-=0.1")
        .fromTo(currentPage, 0.3, {opacity:1,pointerEvents:"all"}, {opacity:0, pointerEvents:"none"})
        .fromTo(changePage, 0.3, {opacity:0, pointerEvents:"none"}, {opacity:1, pointerEvents:"all"},"-=0.1")
        .fromTo(changeJudul, 0.5, {y:"70%", opacity:0}, {y:"0%",opacity:1},"-=0.6")
        .fromTo(changeket, 0.5, {y:"50%",opacity:0}, {y:"0%", opacity:1},"-=0.1")
        .fromTo(changeContent, 0.5, {x:"-40%",opacity:0}, {x:"0%",opacity:1}, "-=0.3")
        

        current=pageNumber;
    }

    //scroll
    document.addEventListener("wheel",throttle(scrollChange,1500));
    document.addEventListener("touchmove", throttle(scrollChange,1500));
    
    function switchNav(navNumber){
        const activeNav = document.querySelectorAll(".nav")[navNumber];
        navs.forEach(nav=>{
            nav.classList.remove("active");
        })
        activeNav.classList.add("active");
    }

    function scrollChange(e){
        if (e.deltaY>0) {
            scrollSlide += 1;
        }else{
            scrollSlide -= 1;
        }

        if(scrollSlide>3){
            scrollSlide =0;
        }
        if(scrollSlide<0){
            scrollSlide = 3;
        }
        switchNav(scrollSlide);
        changePage(scrollSlide);
    }

    const hamburger = document.querySelector(".nav-mobile"); 
    const hamburgerLines = document.querySelectorAll(".nav-mobile rect"); 
    const navOpen = document.querySelector(".nav-open");
    const tl = new TimelineMax({ paused: true, reversed: true });
  
    tl.to(navOpen, 0.5, { y: 0 })
      .fromTo(
        hamburgerLines,
        0.2,
        { fill: "white" },
        { fill: "black" },
        "-=0.1"
      );
  
    hamburger.addEventListener("click", () => {
        if(count%2==0){

        }else{

        }
        tl.reversed() ? tl.play() : tl.reverse();
    });

}


function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

init();