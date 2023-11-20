function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotiveAnimation();


function navbarAnimation() {

    gsap.from("#nav-part1", {
        opacity: 0,
        y: -50,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
    });





    gsap.to("#nav-part1 #one", {
        transform: "translateY(-100%)",
        ease: "power1",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    })
    gsap.to("#nav-part1 #two", {
        transform: "translateY(-250%)",
        ease: "power1",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    })
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-250%)",
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    })

    // Animation for #nav-part2 using GSAP
    gsap.from("#nav-part2 a", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2, // Stagger the animation for each link
        ease: "power2.out",
        delay: 1, // Delay the animation for #nav-part2
    });

    // Animation for cart icon
    gsap.from("#icons", {
        opacity: 0,
        x: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.5, // Delay the animation for the cart icon
    });
}
navbarAnimation();







function videoConAnimation() {

    let videoCon = document.querySelector("#video-container")
    let playBtn = document.querySelector("#play")
    videoCon.addEventListener("mouseenter", function () {
        gsap.to(playBtn, {
            opacity: 1,
            scale: 1,
        })

    })

    videoCon.addEventListener("mouseleave", function () {
        gsap.to(playBtn, {
            opacity: 0,
            scale: 0,
        })

    })

    videoCon.addEventListener("mousemove", function (dets) {
        gsap.to(playBtn, {
            left: dets.x - 50,
            top: dets.y - 50,
        })

    })
}
videoConAnimation()

function loadingAnimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: .5,
        duration: .9,
        stagger: .3,
    })
    gsap.from("#page1 #video-container", {
        scale: .9,
        opacity: 0,
        delay: 1,
        duration: .5,

    })
}
loadingAnimation()

function cursorAnimation() {

    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
        })
    })

    let a = document.querySelectorAll(".child")
    a.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: `translate(-50%, -50%) scale(1)`,
            });
        });
        elem.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: `translate(-50%, -50%) scale(0)`,
            });
        })
    });

    // Code for single cursor Animation on each one 

    // document.querySelectorAll(".child").addEventListener("mouseenter",function(){
    //     gsap.to("#cursor",{
    //         transform: `translate(-50%, -50%) scale(1)`
    //     })
    // })

    // document.querySelectorAll(".child").addEventListener("mouseleave",function(){
    //     gsap.to("#cursor",{
    //         transform: `translate(-50%, -50%) scale(0)`
    //     })
    // })
}
cursorAnimation();


