/* =====================================================
   KUMAR & KAVYA
   WEDDING WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const music =
            document.getElementById(
                "weddingMusic"
            );


        const musicButton =
            document.getElementById(
                "musicButton"
            );


        const loader =
            document.getElementById(
                "loader"
            );


        const enterInvitation =
            document.getElementById(
                "enterInvitation"
            );


        /* =================================================
           MUSIC
        ================================================= */

        let musicStarted = false;


        /*
            Update music button
        */

        function updateMusicButton() {

            if (!musicButton) {
                return;
            }


            if (music.paused) {

                musicButton.innerHTML = "♪";

                musicButton.setAttribute(
                    "aria-label",
                    "Play wedding music"
                );

                musicButton.classList.remove(
                    "playing"
                );

            }

            else {

                musicButton.innerHTML = "❚❚";

                musicButton.setAttribute(
                    "aria-label",
                    "Pause wedding music"
                );

                musicButton.classList.add(
                    "playing"
                );

            }

        }


        /*
            Start music
        */

        function startMusic() {

            if (!music) {
                return;
            }


            music.volume = 0.7;


            const playPromise =
                music.play();


            if (
                playPromise !== undefined
            ) {

                playPromise
                    .then(function () {

                        musicStarted = true;

                        updateMusicButton();

                    })
                    .catch(function (error) {

                        /*
                           Browser blocked autoplay.

                           This is normal in Chrome,
                           Edge and mobile browsers.
                        */

                        console.log(
                            "Autoplay blocked:",
                            error
                        );

                        updateMusicButton();

                    });

            }

        }


        /*
            Try to start music immediately
            when website opens.
        */

        startMusic();


        /* =================================================
           FIRST USER INTERACTION
        ================================================= */

        function startMusicOnFirstInteraction() {

            if (
                !musicStarted &&
                music &&
                music.paused
            ) {

                music.volume = 0.7;


                music.play()
                    .then(function () {

                        musicStarted = true;

                        updateMusicButton();

                    })
                    .catch(function (error) {

                        console.log(
                            "Music waiting for interaction:",
                            error
                        );

                    });

            }

        }


        /*
            If browser blocks autoplay,
            first click anywhere starts music.
        */

        document.addEventListener(
            "click",
            startMusicOnFirstInteraction,
            {
                once: true
            }
        );


        document.addEventListener(
            "touchstart",
            startMusicOnFirstInteraction,
            {
                once: true,
                passive: true
            }
        );


        /* =================================================
           MUSIC BUTTON
        ================================================= */

        if (musicButton) {

            musicButton.addEventListener(
                "click",
                function (event) {

                    /*
                       Prevent the document click
                       from interfering with the
                       pause/play button.
                    */

                    event.stopPropagation();


                    if (music.paused) {

                        music.volume = 0.7;


                        music.play()
                            .then(function () {

                                musicStarted = true;

                                updateMusicButton();

                            })
                            .catch(function (error) {

                                console.error(
                                    "Music play error:",
                                    error
                                );

                            });

                    }

                    else {

                        music.pause();

                        updateMusicButton();

                    }

                }
            );

        }


        /* =================================================
           MUSIC ENDED
        ================================================= */

        if (music) {

            music.addEventListener(
                "ended",
                function () {

                    music.currentTime = 0;

                    music.play();

                }
            );


            music.addEventListener(
                "play",
                function () {

                    updateMusicButton();

                }
            );


            music.addEventListener(
                "pause",
                function () {

                    updateMusicButton();

                }
            );

        }


        /* =================================================
           OPEN INVITATION
        ================================================= */

        if (enterInvitation) {

            enterInvitation.addEventListener(
                "click",
                function () {


                    /*
                       This click is guaranteed to
                       count as user interaction.

                       Therefore music can start.
                    */

                    if (
                        music &&
                        music.paused
                    ) {

                        music.volume = 0.7;


                        music.play()
                            .then(function () {

                                musicStarted = true;

                                updateMusicButton();

                            })
                            .catch(function (error) {

                                console.error(
                                    "Music error:",
                                    error
                                );

                            });

                    }


                    /*
                       Hide opening screen
                    */

                    if (loader) {

                        loader.classList.add(
                            "hide"
                        );

                    }

                }
            );

        }


        /* =================================================
           FALLING PETALS
        ================================================= */

        const petals =
            document.getElementById(
                "petals"
            );


        if (petals) {


            for (
                let i = 0;
                i < 30;
                i++
            ) {

                const petal =
                    document.createElement(
                        "span"
                    );


                petal.className =
                    "petal";


                petal.style.left =
                    Math.random() * 100 +
                    "%";


                petal.style.animationDuration =
                    (
                        6 +
                        Math.random() * 8
                    ) +
                    "s";


                petal.style.animationDelay =
                    Math.random() * 8 +
                    "s";


                petal.style.opacity =
                    .3 +
                    Math.random() * .5;


                petals.appendChild(
                    petal
                );

            }

        }


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "active"
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );


        /* =================================================
           COUNTDOWN
        ================================================= */

        /*
            CHANGE YOUR WEDDING DATE HERE.

            Format:

            YYYY-MM-DDTHH:MM:SS

        */

        const weddingDate =
            new Date(
                "2026-12-25T10:30:00"
            );


        function updateCountdown() {


            const now =
                new Date();


            const difference =
                weddingDate.getTime() -
                now.getTime();


            if (
                difference <= 0
            ) {

                setCountdown(
                    0,
                    0,
                    0,
                    0
                );

                return;

            }


            const days =
                Math.floor(
                    difference /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );


            const hours =
                Math.floor(
                    (
                        difference /
                        (
                            1000 *
                            60 *
                            60
                        )
                    ) % 24
                );


            const minutes =
                Math.floor(
                    (
                        difference /
                        (
                            1000 *
                            60
                        )
                    ) % 60
                );


            const seconds =
                Math.floor(
                    (
                        difference /
                        1000
                    ) % 60
                );


            setCountdown(
                days,
                hours,
                minutes,
                seconds
            );

        }


        function setCountdown(
            days,
            hours,
            minutes,
            seconds
        ) {


            const daysElement =
                document.getElementById(
                    "days"
                );


            const hoursElement =
                document.getElementById(
                    "hours"
                );


            const minutesElement =
                document.getElementById(
                    "minutes"
                );


            const secondsElement =
                document.getElementById(
                    "seconds"
                );


            if (daysElement) {

                daysElement.textContent =
                    String(days)
                        .padStart(2, "0");

            }


            if (hoursElement) {

                hoursElement.textContent =
                    String(hours)
                        .padStart(2, "0");

            }


            if (minutesElement) {

                minutesElement.textContent =
                    String(minutes)
                        .padStart(2, "0");

            }


            if (secondsElement) {

                secondsElement.textContent =
                    String(seconds)
                        .padStart(2, "0");

            }

        }


        updateCountdown();


        setInterval(
            updateCountdown,
            1000
        );


        /* =================================================
           RSVP
        ================================================= */

        const rsvpForm =
            document.getElementById(
                "rsvpForm"
            );


        if (rsvpForm) {

            rsvpForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    alert(
                        "Thank you for your RSVP! ❤️"
                    );


                    rsvpForm.reset();

                }
            );

        }


        /* =================================================
           LOADER FALLBACK
        ================================================= */

        /*
           Keep opening screen for a few seconds.

           If user does not click Open Invitation,
           automatically hide it.

           Music will still attempt autoplay.
        */

        setTimeout(
            function () {

                if (
                    loader &&
                    !loader.classList.contains(
                        "hide"
                    )
                ) {

                    loader.classList.add(
                        "hide"
                    );

                }

            },
            1000000
        );


    }
);




/* =====================================================
   CURSOR FLOWER + FLOWER CRACKER EFFECT
===================================================== */

(function () {

    /*
       Don't run cursor effects on touch-only devices.
    */

    if (
        !window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        return;

    }


    const effectContainer =
        document.getElementById(
            "cursorEffects"
        );


    const canvas =
        document.getElementById(
            "flowerCrackers"
        );


    if (
        !effectContainer ||
        !canvas
    ) {

        return;

    }


    const ctx =
        canvas.getContext("2d");


    /* =================================================
       CANVAS SIZE
    ================================================= */

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =================================================
       FLOWER TYPES
    ================================================= */

    const flowers = [
        "🌸",
        "🌺",
        "🌼",
        "✿",
        "❀"
    ];


    /* =================================================
       CURSOR TRAIL
    ================================================= */

    let lastX = 0;

    let lastY = 0;

    let flowerTimer = 0;


    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                event.clientX;

            const y =
                event.clientY;


            const distance =
                Math.hypot(
                    x - lastX,
                    y - lastY
                );


            /*
               Only create flowers after
               cursor has moved enough.
            */

            if (
                distance > 12 &&
                Date.now() - flowerTimer > 45
            ) {

                createCursorFlower(
                    x,
                    y
                );


                createSparkle(
                    x,
                    y
                );


                lastX = x;

                lastY = y;

                flowerTimer =
                    Date.now();

            }

        }
    );


    /* =================================================
       CREATE FLOWER
    ================================================= */

    function createCursorFlower(
        x,
        y
    ) {

        const flower =
            document.createElement(
                "span"
            );


        flower.className =
            "cursor-flower";


        flower.textContent =
            flowers[
                Math.floor(
                    Math.random() *
                    flowers.length
                )
            ];


        const size =
            12 +
            Math.random() * 12;


        flower.style.fontSize =
            size + "px";


        flower.style.left =
            x + "px";


        flower.style.top =
            y + "px";


        /*
           Slight random color tint
        */

        const colors = [
            "#e8a0aa",
            "#f0b4bf",
            "#efd58b",
            "#ffffff"
        ];


        flower.style.filter =
            "drop-shadow(0 2px 3px rgba(0,0,0,.2))";


        flower.style.animationDuration =
            (
                .8 +
                Math.random() * .8
            ) +
            "s";


        effectContainer.appendChild(
            flower
        );


        /*
           Remove after animation
        */

        setTimeout(
            function () {

                flower.remove();

            },
            1800
        );

    }


    /* =================================================
       GOLD SPARKLE
    ================================================= */

    function createSparkle(
        x,
        y
    ) {

        const sparkle =
            document.createElement(
                "span"
            );


        sparkle.className =
            "cursor-flower";


        sparkle.textContent =
            Math.random() > .5
                ? "✦"
                : "✧";


        sparkle.style.left =
            (
                x +
                (Math.random() * 24 - 12)
            ) +
            "px";


        sparkle.style.top =
            (
                y +
                (Math.random() * 24 - 12)
            ) +
            "px";


        sparkle.style.fontSize =
            (
                7 +
                Math.random() * 7
            ) +
            "px";


        sparkle.style.color =
            "#efd58b";


        sparkle.style.animationDuration =
            ".7s";


        effectContainer.appendChild(
            sparkle
        );


        setTimeout(
            function () {

                sparkle.remove();

            },
            900
        );

    }


    /* =================================================
       FLOWER CRACKER PARTICLES
    ================================================= */

    let particles = [];


    function createFlowerCracker(
        x,
        y
    ) {


        const particleCount = 32;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {


            const angle =
                (
                    Math.PI * 2
                ) *
                (
                    i /
                    particleCount
                );


            const speed =
                1.5 +
                Math.random() * 3.5;


            particles.push({

                x: x,

                y: y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 1,

                size:
                    2 +
                    Math.random() * 4,

                type:
                    Math.random() > .35
                        ? "flower"
                        : "sparkle",

                rotation:
                    Math.random() *
                    Math.PI * 2,

                rotationSpeed:
                    (
                        Math.random() -
                        .5
                    ) * .15

            });

        }

    }


    /* =================================================
       DRAW FLOWER CRACKER
    ================================================= */

    function drawFlower(
        x,
        y,
        size,
        rotation,
        alpha
    ) {

        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.rotate(
            rotation
        );


        ctx.globalAlpha =
            alpha;


        /*
           Pink petals
        */

        ctx.fillStyle =
            "#efa6b3";


        for (
            let i = 0;
            i < 5;
            i++
        ) {

            ctx.rotate(
                Math.PI * 2 / 5
            );


            ctx.beginPath();

            ctx.ellipse(
                0,
                -size * .65,
                size * .45,
                size * .8,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        /*
           Golden center
        */

        ctx.fillStyle =
            "#efd58b";


        ctx.beginPath();

        ctx.arc(
            0,
            0,
            size * .28,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.restore();

    }


    /* =================================================
       DRAW SPARKLE
    ================================================= */

    function drawSparkle(
        x,
        y,
        size,
        alpha
    ) {

        ctx.save();


        ctx.globalAlpha =
            alpha;


        ctx.fillStyle =
            "#efd58b";


        ctx.beginPath();


        ctx.moveTo(
            x,
            y - size
        );


        ctx.lineTo(
            x + size * .25,
            y - size * .25
        );


        ctx.lineTo(
            x + size,
            y
        );


        ctx.lineTo(
            x + size * .25,
            y + size * .25
        );


        ctx.lineTo(
            x,
            y + size
        );


        ctx.lineTo(
            x - size * .25,
            y + size * .25
        );


        ctx.lineTo(
            x - size,
            y
        );


        ctx.lineTo(
            x - size * .25,
            y - size * .25
        );


        ctx.closePath();


        ctx.fill();


        ctx.restore();

    }


    /* =================================================
       ANIMATION LOOP
    ================================================= */

    function animateParticles() {


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {


            const particle =
                particles[i];


            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;


            /*
               Gravity
            */

            particle.vy +=
                .035;


            particle.life -=
                .018;


            particle.rotation +=
                particle.rotationSpeed;


            if (
                particle.life <= 0
            ) {

                particles.splice(
                    i,
                    1
                );

                continue;

            }


            if (
                particle.type ===
                "flower"
            ) {

                drawFlower(
                    particle.x,
                    particle.y,
                    particle.size,
                    particle.rotation,
                    particle.life
                );

            }

            else {

                drawSparkle(
                    particle.x,
                    particle.y,
                    particle.size * 1.5,
                    particle.life
                );

            }

        }


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();


    /* =================================================
       CLICK = FLOWER CRACKER
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            /*
               Don't create cracker on
               music button / form controls.
            */

            if (
                event.target.closest(
                    "button, input, select, textarea, a"
                )
            ) {

                return;

            }


            createFlowerCracker(
                event.clientX,
                event.clientY
            );


            /*
               Also create small flower
            */

            for (
                let i = 0;
                i < 3;
                i++
            ) {

                setTimeout(
                    function () {

                        createCursorFlower(
                            event.clientX +
                            (
                                Math.random() *
                                30 -
                                15
                            ),

                            event.clientY +
                            (
                                Math.random() *
                                30 -
                                15
                            )
                        );

                    },
                    i * 50
                );

            }

        }
    );


})();



/* =====================================================
   LOCK SCROLL WHILE OPENING INVITATION IS VISIBLE
===================================================== */

document.documentElement.classList.add(
    "invitation-locked"
);

document.body.classList.add(
    "invitation-locked"
);


const enterInvitation =
    document.getElementById("enterInvitation");


const loader =
    document.getElementById("loader");


if (enterInvitation) {

    enterInvitation.addEventListener(
        "click",
        function () {

            /*
               Hide opening screen
            */

            if (loader) {

                loader.classList.add("hide");

            }


            /*
               Enable website scrolling
            */

            document.documentElement.classList.remove(
                "invitation-locked"
            );

            document.body.classList.remove(
                "invitation-locked"
            );

        }
    );

}