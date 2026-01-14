(() => {
  "use strict";

  // -------------------- Helpers --------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function safeAddListener(el, evt, fn) {
    if (el) el.addEventListener(evt, fn);
  }

  // -------------------- Feature 1: Home Slider --------------------
  function initHomeSlider() {
    const images = $$(".slides img");
    const leftBtn = $("#left-button");
    const rightBtn = $("#right-button");
    const titleEl = $("#slider-title .song-title");

    // Only run if the slider exists on this page
    if (!images.length || !leftBtn || !rightBtn || !titleEl) return;

    const songTitles = ["7 Years", "Memories", "Photograph"];
    let current = 0;

    function updateSlider(index) {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
      titleEl.textContent = songTitles[index] ?? "";
    }

    safeAddListener(leftBtn, "click", () => {
      current = (current - 1 + images.length) % images.length;
      updateSlider(current);
    });

    safeAddListener(rightBtn, "click", () => {
      current = (current + 1) % images.length;
      updateSlider(current);
    });

    // Ensure initial state is consistent
    updateSlider(current);
  }

  // -------------------- Feature 2: Register Validation --------------------
  function initRegisterValidation() {
    const form = $("#registerForm");
    if (!form) return;

    const nameInput = $("#name");
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const ageInput = $("#age");
    const male = $("#male");
    const female = $("#female");

    const nameError = $("#nameError");
    const emailError = $("#emailError");
    const passwordError = $("#passwordError");
    const ageError = $("#ageError");
    const genderError = $("#genderError");

    function setError(el, msg) {
      if (el) el.textContent = msg || "";
    }

    function hasNumber(str) {
      for (let i = 0; i < str.length; i++) {
        if (!Number.isNaN(Number(str[i])) && str[i] !== " ") return true;
      }
      return false;
    }

    safeAddListener(form, "submit", (e) => {
      e.preventDefault();

      let valid = true;

      const name = (nameInput?.value || "").trim();
      if (name.length < 3) {
        setError(nameError, "Name must be at least 3 characters.");
        valid = false;
      } else {
        setError(nameError, "");
      }

      const email = (emailInput?.value || "").trim();
      const at = email.indexOf("@");
      const dot = email.lastIndexOf(".");
      if (!email || at === -1 || dot === -1 || at > dot) {
        setError(emailError, "Enter a valid email address.");
        valid = false;
      } else {
        setError(emailError, "");
      }

      const password = passwordInput?.value || "";
      if (password.length < 6) {
        setError(passwordError, "Password must be at least 6 characters.");
        valid = false;
      } else if (!hasNumber(password)) {
        setError(passwordError, "Password must contain at least one number.");
        valid = false;
      } else {
        setError(passwordError, "");
      }

      const ageStr = ageInput?.value || "";
      const age = Number(ageStr);
      if (!ageStr || Number.isNaN(age) || age < 10 || age > 100) {
        setError(ageError, "Age must be between 10 and 100.");
        valid = false;
      } else {
        setError(ageError, "");
      }

      const genderSelected = !!male?.checked || !!female?.checked;
      if (!genderSelected) {
        setError(genderError, "Please select your gender.");
        valid = false;
      } else {
        setError(genderError, "");
      }

      if (valid) {
        alert("Registration successful!");
        form.reset();
      }
    });
  }

  // -------------------- Feature 3: Song Detail Player --------------------
  function initSongDetailPlayer() {
    // Required DOM for Detail page
    const titleEl = $("#song-title");
    const artistEl = $("#song-artist");
    const descEl = $("#song-desc");
    const lyricsEl = $("#song-lyrics");
    const audioPlayer = $("audio#audio-player"); // querySelector gets the first match safely
    const playBtn = $("#play-btn");
    const prevBtn = $("#prev-btn");
    const nextBtn = $("#next-btn");
    const progressBar = $("#audio-progress-bar");

    // Only run if we're on the detail page
    if (!titleEl || !artistEl || !descEl || !lyricsEl || !audioPlayer || !playBtn || !prevBtn || !nextBtn || !progressBar) {
      return;
    }

    // NOTE: Full song lyrics are not included here to avoid copyright issues.
    // If you want lyrics in a private/local-only project, you can add them back.
    const songs = [
      {
        title: "7 Years",
        artist: "Lukas Graham",
        desc: "A reflective and soulful pop song that chronicles the journey of life from childhood to adulthood.",
        lyrics: "Lyrics unavailable in this demo.",
        audio: "Asset/Song/Lukas_Graham_7_Years.mp3",
      },
      {
        title: "Be Alright",
        artist: "Dean Lewis",
        desc: "A heartfelt ballad about heartbreak and healing, blending personal experiences with stories from friends to convey a message of hope and resilience.",
        lyrics: "Lyrics unavailable in this demo.",
        audio: "Asset/Song/Dean_Lewis_Be_Alright.mp3",
      },
      {
        title: "How Do I Say Goodbye",
        artist: "Dean Lewis",
        desc: "A touching tribute to Dean Lewis’s father, this emotional ballad explores the pain of impending loss and the struggle to say farewell with love and gratitude.",
        lyrics: "Lyrics unavailable in this demo.",
        audio: "Asset/Song/Dean_Lewis_How_Do_I_Say_Goodbye.mp3",
      },
      {
        title: "Hate That It's True",
        artist: "Dean Lewis",
        desc: "A heartfelt track that captures the lingering pain and denial following a breakup, blending emotional lyrics with soaring melodies to convey the struggle of letting go.",
        lyrics: "Lyrics unavailable in this demo.",
        audio: "Asset/Song/Dean_Lewis_Hate_That_It's_True.mp3",
      },
      {
        title: "Memories",
        artist: "Maroon 5",
        desc: "A nostalgic pop ballad reflecting on loss and cherishing past moments, built around a catchy, emotional melody.",
        lyrics: "Lyrics unavailable in this demo.",
        audio: "Asset/Song/Maroon_5_Memories.mp3",
      },
    ];

    let currentSong = 0;

    function setPlayIcon(isPlaying) {
      // Play: ▶  Pause: ❚❚
      playBtn.innerHTML = isPlaying ? "&#10073;&#10073;" : "&#9654;";
    }

    function loadSong(idx) {
      const song = songs[idx];
      titleEl.textContent = song.title;
      artistEl.textContent = song.artist;
      descEl.innerHTML = `<strong>Description:</strong> ${song.desc}`;
      lyricsEl.textContent = song.lyrics || "Lyrics coming soon...";

      audioPlayer.src = song.audio;
      progressBar.style.width = "0%";
      setPlayIcon(false);
    }

    safeAddListener(playBtn, "click", async () => {
      try {
        if (audioPlayer.paused) {
          await audioPlayer.play();
          setPlayIcon(true);
        } else {
          audioPlayer.pause();
          setPlayIcon(false);
        }
      } catch {
        // Autoplay restrictions or missing file; keep UI stable.
        setPlayIcon(false);
      }
    });

    safeAddListener(prevBtn, "click", () => {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      loadSong(currentSong);
      audioPlayer.pause();
      setPlayIcon(false);
    });

    safeAddListener(nextBtn, "click", () => {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
      audioPlayer.pause();
      setPlayIcon(false);
    });

    safeAddListener(audioPlayer, "timeupdate", () => {
      if (audioPlayer.duration) {
        const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${pct}%`;
      }
    });

    safeAddListener(audioPlayer, "ended", () => {
      setPlayIcon(false);
    });

    // Initial load
    loadSong(currentSong);
  }

  // -------------------- Boot --------------------
  onReady(() => {
    initHomeSlider();
    initRegisterValidation();
    initSongDetailPlayer();
  });
})();
