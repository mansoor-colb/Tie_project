-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2023 at 06:33 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_band`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `artist_id` varchar(50) NOT NULL,
  `album_id` varchar(50) NOT NULL,
  `album_name` varchar(50) NOT NULL,
  `album_genere` varchar(50) NOT NULL,
  `cover` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `artist_id`, `album_id`, `album_name`, `album_genere`, `cover`) VALUES
(8, '053e3aafdb577fa5aa0dfe1b3e639f4d', '6627', 'Echoes of Eternity', 'rock', 'images-1694858097696.jpg'),
(9, '053e3aafdb577fa5aa0dfe1b3e639f4d', '7812', 'Vibrant Soundscapes', 'folk', 'images-1694858503226.jpg'),
(10, '053e3aafdb577fa5aa0dfe1b3e639f4d', '4370', 'Lyricals smoothe', 'lyrics', 'images-1694858856238.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `aid` varchar(50) NOT NULL,
  `artist_name` varchar(50) NOT NULL,
  `artist_email` varchar(50) NOT NULL,
  `artist_pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `aid`, `artist_name`, `artist_email`, `artist_pass`) VALUES
(7, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Mansoor', '1dt20cs075@dsatm.edu.in', '5b4f9462dedc9fcdadec1ba62372fe95'),
(8, '699d37c734a7e0283db4c942a1210abb', 'Zain', '1dt20cs077@dsatm.edu.in', 'a62b74b2508ea645c57baad498134700');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `msg_id` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_msg` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `msg_id`, `user_name`, `user_msg`) VALUES
(1, 'cfdf9144bffee36b75dc1fc247efad8f', '9080', 'Mansoor', 'THis Group Is Insane ✨✨✨'),
(4, '753e56816a6d39136d9799c0a98a8f83', '7648', 'Zain', 'Totally Agreed ✨✨');

-- --------------------------------------------------------

--
-- Table structure for table `cover_info`
--

CREATE TABLE `cover_info` (
  `id` int(11) NOT NULL,
  `aid` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `description` varchar(800) NOT NULL,
  `youtube` varchar(40) NOT NULL,
  `insta` varchar(40) NOT NULL,
  `images` varchar(900) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cover_info`
--

INSERT INTO `cover_info` (`id`, `aid`, `title`, `tag`, `description`, `youtube`, `insta`, `images`) VALUES
(11, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Sukuun Pulse', 'Sukuun Pulse', 'Welcome to the electrifying world of Sukuun. We are a dynamic ensemble of passionate musicians dedicated to creating unforgettable musical experiences. With a fusion of genres that transcends boundaries, our music weaves stories, emotions, and melodies into a tapestry of sound that resonates with your soul and rest.', 'https://www.youtube.com/watch?v=hgi2MYAF', 'https://www.instagram.com/sanamband/', 'images-1694855330192.jpg,images-1694857269943.jpg,images-1694857476114.webp');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `band_id` varchar(150) NOT NULL,
  `event_id` varchar(50) NOT NULL,
  `event` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `loc` varchar(50) NOT NULL,
  `desp` varchar(500) NOT NULL,
  `price` varchar(50) NOT NULL,
  `images` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `band_id`, `event_id`, `event`, `date`, `loc`, `desp`, `price`, `images`) VALUES
(10, 'null', '5768', 'nb', 'Friday 15 September 2023 - 12:07', 'ssss', 'sss', '56', 'images-1694759861598.png'),
(13, '053e3aafdb577fa5aa0dfe1b3e639f4d', '9574', 'Rise Festival', 'Tuesday 19 September 2023 - 15:15', 'Indore', 'Rise Festivals often feature a diverse lineup of musical acts across various genres. These may include live bands, DJs, solo artists, and other performers. Music is a central focus, with stages and sound systems set up to provide an immersive experience.', '998', 'images-1694859610710.jpg,images-1694859610710.mp4'),
(14, '053e3aafdb577fa5aa0dfe1b3e639f4d', '3561', 'Seastar Fest', 'Tuesday 03 October 2023 - 05:00', 'Mumbai', 'Seastar Music Fest is a sensational music tour that promises to be an unforgettable experience for music enthusiasts of all genres. With a blend of top-tier artists, captivating performances, and a coastal ambiance, this tour offers a unique and immersive musical journey that you won\'t want to miss.', '1500', 'images-1694861155266.mp4,images-1694861155513.jpg'),
(15, '053e3aafdb577fa5aa0dfe1b3e639f4d', '8504', 'Raving music', 'Sunday 06 November 2022 - 02:25', 'Bangalore', 'Raving music is not just a genre; it\'s a pulsating journey of sound, an electrifying escape into the heart of the dance floor. Born in the underground and now a global phenomenon, raving music is a sonic universe that beckons you to leave your worries at the door and let loose.', '677', 'images-1694861400704.mp4,images-1694861400990.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `fan_data`
--

CREATE TABLE `fan_data` (
  `id` int(11) NOT NULL,
  `band_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fan_data`
--

INSERT INTO `fan_data` (`id`, `band_id`, `name`, `email`) VALUES
(1, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Mansoor', 'mansoorahmed52002@gmail.com'),
(2, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Zain', 'mansoorahmed52002@gmail.com'),
(3, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Mansoor', 'mansoorahmed52002@gmail.com'),
(4, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Pulse Subscriber', 'mansoorahmed52002@gmail.com'),
(5, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Pulse Subscriber', 'mansoorahmed52002@gmail.com'),
(6, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Pulse Subscriber', 'mansoorahmed52002@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `band_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `img_path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `band_id`, `name`, `role`, `img_path`) VALUES
(4, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Lopez', 'Guitarist, Drums', 'images-1694860715502.jpg'),
(5, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Zafar Ali', 'Keyboard,Drums,Tabla', 'images-1694861543438.jpg'),
(6, '053e3aafdb577fa5aa0dfe1b3e639f4d', 'Xyper', 'Singer,Keyboard', 'images-1694861655378.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE `track` (
  `id` int(11) NOT NULL,
  `album_id` varchar(50) NOT NULL,
  `track_id` varchar(50) NOT NULL,
  `audio_name` varchar(50) NOT NULL,
  `artist_name` varchar(50) NOT NULL,
  `cover_path` varchar(50) NOT NULL,
  `audio_path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `track`
--

INSERT INTO `track` (`id`, `album_id`, `track_id`, `audio_name`, `artist_name`, `cover_path`, `audio_path`) VALUES
(7, '6627', '6075', 'Voltage Vibes', 'Xyper', 'Timages-1694858296235.jpg', 'audio-1694858296273.mp3'),
(8, '6627', '8363', 'Electronica Odyssey', 'Lopez', 'Timages-1694858408340.jpg', 'audio-1694858408356.mp3'),
(9, '7812', '9683', 'Folkist Drum', 'zafar Ali', 'Timages-1694858618645.jpg', 'audio-1694858618660.mp3'),
(10, '7812', '4540', 'Xing Tabla', 'zafar Ali', 'Timages-1694858746877.jpg', 'audio-1694858746901.mp3'),
(11, '4370', '7654', 'Dip Dop', 'Lopez', 'Timages-1694858941815.jpg', 'audio-1694858941824.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_pass` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_id`, `user_name`, `user_email`, `user_pass`) VALUES
(1, 'cfdf9144bffee36b75dc1fc247efad8f', 'Mansoor', '1dt20cs075@dsatm.edu.in', 'd05563fa82c08324a1c0d0b4eb6bf518'),
(2, '753e56816a6d39136d9799c0a98a8f83', 'Zain', '1dt20cs077@dsatm.edu.in', 'a62b74b2508ea645c57baad498134700');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cover_info`
--
ALTER TABLE `cover_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fan_data`
--
ALTER TABLE `fan_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cover_info`
--
ALTER TABLE `cover_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `fan_data`
--
ALTER TABLE `fan_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `track`
--
ALTER TABLE `track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
