# 🎵 Music Player

Một ứng dụng nghe nhạc hiện đại được xây dựng bằng HTML, CSS và JavaScript thuần túy. Project này tạo ra một giao diện nghe nhạc đẹp mắt với các tính năng tương tác phong phú và trải nghiệm người dùng mượt mà.

## ✨ Tính năng chính

### 🎶 Quản lý nhạc
- **6 bài hát có sẵn** từ các nghệ sĩ nổi tiếng: Adele, Charlie Puth, Miley Cyrus, Lana Del Rey, Ed Sheeran
- **Thông tin chi tiết**: Tên bài hát, ca sĩ, hình ảnh album
- **Playlist tương tác**: Click để chọn bài hát bất kỳ

### 🎮 Điều khiển phát nhạc
- **Play/Pause**: Nút điều khiển chính với hiệu ứng mượt mà
- **Next/Previous**: Chuyển bài hát trước/sau
- **Progress Bar**: Thanh tiến độ có thể tua được
- **Random Mode**: Phát nhạc ngẫu nhiên thông minh
- **Repeat Mode**: Lặp lại bài hát hiện tại

### 🎨 Giao diện và hiệu ứng
- **CD Animation**: Đĩa CD xoay khi phát nhạc
- **Scroll Effect**: CD thu nhỏ khi scroll xuống
- **Active Song Highlight**: Bài hát đang phát được làm nổi bật
- **Smooth Scrolling**: Cuộn mượt đến bài hát đang phát
- **Responsive Design**: Tối ưu cho mọi thiết bị

### 💾 Lưu trữ dữ liệu
- **Local Storage**: Tự động lưu cài đặt random/repeat
- **State Management**: Quản lý trạng thái ứng dụng hiệu quả

### 🔧 Tính năng kỹ thuật
- **Auto Next**: Tự động chuyển bài khi hết
- **Smart Random**: Tránh lặp lại bài hát trong chế độ random
- **Event Handling**: Xử lý đầy đủ các sự kiện audio
- **Modern UI**: Sử dụng Font Awesome icons và Google Fonts

## 🚀 Cách sử dụng

1. **Mở file `index.html`** trong trình duyệt web
2. **Chọn bài hát** từ playlist bên dưới
3. **Điều khiển phát nhạc** bằng các nút:
   - ▶️ Play/Pause
   - ⏭️ Next song
   - ⏮️ Previous song
   - 🔀 Random mode
   - 🔁 Repeat mode
4. **Tua nhạc** bằng cách kéo thanh progress bar

## 📁 Cấu trúc project

```
Music-Player/
├── index.html          # File HTML chính chứa giao diện
├── assets/
│   ├── style.css       # File CSS cho styling
│   ├── app.js          # File JavaScript chứa toàn bộ logic ứng dụng
│   └── music/          # Thư mục chứa các file nhạc MP3
│       ├── ADELE-ADELE-OFFICIAL-Set-fire-to-the-rain.mp3
│       ├── Charlie_Puth_-_Attention_Qoret.com.mp3
│       ├── Charlie_Puth_ft_Selena_Gomez_-_We_Dont_Talk_Anymore_Qoret.com.mp3
│       ├── ed-sheeran-shape-of-you.mp3
│       ├── Lana_Del_Rey_-_Young_And_Beautiful_CeeNaija.com_.mp3
│       └── Miley Cyrus - Flowers (Official Video).mp3
├── README.md           # Tài liệu hướng dẫn
└── update.txt          # File cập nhật
```

## 🎵 Danh sách nhạc

1. **Set Fire To The Rain** - Adele
2. **We Don't Talk Anymore** - Charlie Puth ft. Selena Gomez
3. **Attention** - Charlie Puth
4. **Flowers** - Miley Cyrus
5. **Young and Beautiful** - Lana Del Rey
6. **Shape of You** - Ed Sheeran

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc và semantic markup
- **CSS3**: Styling và animations
- **Vanilla JavaScript**: Logic xử lý và tương tác
- **HTML5 Audio API**: Xử lý phát nhạc
- **Local Storage API**: Lưu trữ cài đặt
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)

## 📱 Responsive Design

Project được thiết kế responsive với:
- **Mobile-first approach**
- **Maximum width**: 480px
- **Touch-friendly controls**
- **Smooth animations**

## 🔮 Tính năng nổi bật

- **Không cần framework**: Sử dụng JavaScript thuần túy
- **Performance cao**: Tải nhanh, mượt mà
- **Cross-browser**: Tương thích với mọi trình duyệt hiện đại
- **Offline ready**: Hoạt động không cần internet
- **User-friendly**: Giao diện trực quan, dễ sử dụng

## 📄 License

Project này được tạo ra cho mục đích học tập và demo. Các file nhạc thuộc về các nghệ sĩ tương ứng.

---

**Tác giả**: Music Player Project  
**Phiên bản**: 1.0  
**Cập nhật**: 2024