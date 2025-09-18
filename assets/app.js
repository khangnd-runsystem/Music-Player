/**
 * Music Player Application
 * 
 * Features:
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / repeat when ended  
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  playIndices: [],
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  song: [
    {
      name: "Set Fire To The Rain",
      singer: "Adele",
      path: "./assets/music/ADELE-ADELE-OFFICIAL-Set-fire-to-the-rain.mp3",
      image: "https://i2.wp.com/moneynation.com/wp-content/uploads/2015/10/Concerts-and-Adele-Net-Worth.jpg?ssl=1"
    },
    {
      name: "We don't talk anymore",
      singer: "Charlie Puth",
      path: "./assets/music/Charlie_Puth_ft_Selena_Gomez_-_We_Dont_Talk_Anymore_Qoret.com.mp3",
      image: "https://th.bing.com/th/id/OIP.wHq7pPQU9qx5utiVbIajSQHaHa?rs=1&pid=ImgDetMain"
    },
    {
      name: "Attention",
      singer: "Charlie Puth",
      path: "./assets/music/Charlie_Puth_-_Attention_Qoret.com.mp3",
      image: "https://th.bing.com/th/id/OIP.WNQKU1Ybfy77GWa3NGXP5AHaHC?rs=1&pid=ImgDetMain"
    },
    {
      name: "Flowers",
      singer: "Miley Cyrus",
      path: "./assets/music/Miley Cyrus - Flowers (Official Video).mp3",
      image: "https://th.bing.com/th/id/OIP.5bgSUqMKMtP7zo-A40rvqQHaHa?rs=1&pid=ImgDetMain"
    },
    {
      name: "Young and Beautiful",
      singer: "Lana Del Rey",
      path: "./assets/music/Lana_Del_Rey_-_Young_And_Beautiful_CeeNaija.com_.mp3",
      image: "https://th.bing.com/th/id/OIP.kzhB_wcZ-l1fcL8iFg4CNAAAAA?rs=1&pid=ImgDetMain"
    },
    {
      name: "Shape of You",
      singer: "Ed Sheeran",
      path: "./assets/music/ed-sheeran-shape-of-you.mp3",
      image: "https://th.bing.com/th/id/OIP.TLRlQP7N61REDvgV_OAdHgHaHa?rs=1&pid=ImgDetMain"
    },
  ],

  setConfig: function(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  render: function() {
    const htmls = this.song.map((song, index) => {
      return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url(${song.image})">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
              </div>`
    })
    playlist.innerHTML = htmls.join('');
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.song[this.currentIndex];
      }
    })
  },

  handleEvents: function() {
    const _this = this;
    
    // Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý CD phóng to thu nhỏ
    const cdWidth = cd.offsetWidth;

    document.onscroll = function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    }

    // Xử lý khi click play
    playBtn.onclick = function() {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    // Khi bài hát được play
    audio.onplay = function() {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    }

    // Khi bài hát bị pause
    audio.onpause = function() {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function() {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
      }
    }

    // Xử lý khi tua song
    progress.oninput = function(e) {
      const seekTime = audio.duration / 100 * e.target.value;
      audio.currentTime = seekTime
    }

    // Khi next song
    nextBtn.onclick = function() {
      if (_this.isRandom) {
        _this.playRandomSong();
        _this.loadCurrentSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    }

    // Khi prev song
    prevBtn.onclick = function() {
      if (_this.isRandom) {
        _this.playRandomSong();
        _this.loadCurrentSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    }

    // Khi random song
    randomBtn.onclick = function() {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle('active', _this.isRandom);
    }

    // Khi repeat song
    repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatBtn.classList.toggle('active', _this.isRepeat);
    }

    // Khi bài hát kết thúc
    audio.onended = function() {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    }

    // Khi click vào playlist
    playlist.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)');
      if (songNode || !e.target.closest('.option')) {
        console.log(songNode.getAttribute('data-index'));
        if (songNode) {
          _this.currentIndex = Number(songNode.getAttribute('data-index'))
          _this.loadCurrentSong();
          _this.render();
          _this.scrollToActiveSong();
          audio.play();
        }
      }
      if (e.target.closest('.option')) {
        // Handle option click if needed
      }
    }
  },

  loadCurrentSong: function() {
    heading.innerText = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },

  loadConfig: function() {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 300)
  },

  nextSong: function() {
    this.currentIndex++;
    if (this.currentIndex >= this.song.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.song.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function() {
    let newIndex;
    do {
      if (this.playIndices.length === this.song.length) {
        this.playIndices = [];
      }
      // Tạo ra một số ngẫu nhiên trong khoảng từ 0 đến độ dài của mảng bài hát
      newIndex = Math.floor(Math.random() * this.song.length);
    }
    while (newIndex === this.currentIndex || this.playIndices.includes(newIndex));
    this.playIndices.push(newIndex);
    this.currentIndex = newIndex;
  },

  start: function() {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat 
    randomBtn.classList.toggle('active', this.isRandom);
    repeatBtn.classList.toggle('active', this.isRepeat);
  },
}

// Khởi động ứng dụng khi DOM đã load
document.addEventListener('DOMContentLoaded', function() {
  app.start();
});
