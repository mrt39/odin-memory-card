// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <div className="footer">
    <p>All Pokemon images&names belong to Pokemon™</p>
    <div className="footer-firstline">
      <a href="https://github.com/mrt39">
        <div id="svgContainer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="2rem" width="2rem" fill="#fff" className="sc-idOhPF kGntgQ">
            <path d="M255.968 5.329C114.624 5.329 0 120.401 0 262.353c0 113.536 73.344 209.856 175.104 243.872 12.8 2.368 17.472-5.568 17.472-12.384 0-6.112-.224-22.272-.352-43.712-71.2 15.52-86.24-34.464-86.24-34.464-11.616-29.696-28.416-37.6-28.416-37.6-23.264-15.936 1.728-15.616 1.728-15.616 25.696 1.824 39.2 26.496 39.2 26.496 22.848 39.264 59.936 27.936 74.528 21.344 2.304-16.608 8.928-27.936 16.256-34.368-56.832-6.496-116.608-28.544-116.608-127.008 0-28.064 9.984-51.008 26.368-68.992-2.656-6.496-11.424-32.64 2.496-68 0 0 21.504-6.912 70.4 26.336 20.416-5.696 42.304-8.544 64.096-8.64 21.728.128 43.648 2.944 64.096 8.672 48.864-33.248 70.336-26.336 70.336-26.336 13.952 35.392 5.184 61.504 2.56 68 16.416 17.984 26.304 40.928 26.304 68.992 0 98.72-59.84 120.448-116.864 126.816 9.184 7.936 17.376 23.616 17.376 47.584 0 34.368-.32 62.08-.32 70.496 0 6.88 4.608 14.88 17.6 12.352C438.72 472.145 512 375.857 512 262.353 512 120.401 397.376 5.329 255.968 5.329z"></path>
          </svg>
        </div>
      </a>
      <p>Made by mrt39, as part of <a href="https://www.theodinproject.com/">The Odin Project</a> React curriculum.</p>
    </div>
    <p>Music by <a href="https://pixabay.com/users/moodmode-33139253/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=138828">moodmode</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=138828">Pixabay</a></p>
  </div>
);

export default Footer;