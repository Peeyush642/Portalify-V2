import Buttons from "@/app/Buttons/page";
// import "./buttons.css";
export default function Page({ params }) {
  const formID = params.formId;
  return (
    <div class="button-container">
      {/* button 1 */}
      <button class="b2">
        Submit
        <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
          <path
            clip-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      <style>
        {`
        .b2{
          display:block;
          margin-bottom:10px;
          margin-top:10px;
        }
.b2 {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(0 107 179);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.b2:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.b2:hover .icon {
  transform: translate(4px);
}

.b2:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.b2::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}
`}
      </style>

      {/* button 2 */}
      <button class="b3"> Submit</button>
      <style>
        {`
.b3{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}
.b3 {
  position: relative;
  display: inline-block;
  margin: 15px;
  padding: 15px 30px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #725AC1;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid #725AC1;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 #725AC1;
}

.b3:hover {
  color: white;
  box-shadow: inset 0 -100px 0 0 #725AC1;
}

.b3:active {
  transform: scale(0.9);
}
`}
      </style>

      {/* button 3 */}
      <button class="b4">
        <p class="submit">Submit</p>
      </button>
      <style>
        {`
.b4{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}
.b4 {
  width: 90px;
  height: 40px;
  position: relative;
  font-family: var(--font);
  color: #3b82f6;
  font-weight: 600;
  background-color: #fff;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  transition: all ease 100ms;
}
.b4:hover {
  background-color: #cbdcf8;
}
.b4:focus {
  background-color: #cbdcf8;
}
.b4::before {
  content: 'done✅';
  position: absolute;
  color: #3b82f6;
  left: 0;
  top: -14px;
  right: 0;
  transition: all ease 300ms;
  opacity: 0%;
}
.b4:focus::before {
  opacity: 100%;
  transform: translatey(26px);
}

.submit {
  transition: all ease 100ms;
  opacity: 100%;
}
.b4:focus > .submit {
  opacity: 0%;
}


`}
      </style>
      {/* button 4 */}
      <button class="b5">Submit</button>
      <style>{`
.b5{
  display:block;
  margin-bottom:20px;
}

.b5 {
  font-family: monospace;
  background-color: #3b82f6;
  color: #3b82f6;
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 45px;
  transition: .3s;
  
}

.b5:hover {
  background-color: #3b82f6;
  box-shadow: 0 0 0 5px #3b83f65f;
  color: #3b82f6;
}
`}</style>
      {/* button 5*/}
      <button class="b6">Submit</button>
      <style>
        {`
.b6{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}
.b6 {
  cursor: pointer;
  position: relative;
  padding: 10px 24px;
  font-size: 18px;
  color: white;
  border: 2px solid #F3B431;
  border-radius: 34px;
  background-color: #F3B431;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  overflow: hidden;
}

.b6::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: #F3B431;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.b6:hover::before {
  scale: 3;
}

.b6:hover {
  color: #212121;
  scale: 1.1;
  box-shadow: 0 0px 20px #F3B431;
}

.b6:active {
  scale: 1;
}

`}
      </style>
      {/* button 6 */}
      <button class="b7">
        <svg
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
        >
          <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
        </svg>
        <span>Back</span>
      </button>
      <style>
        {`
.b7{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}
.b7 {
  display: flex;
  height: 3em;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 3px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #fff;
 }
 
 .b7 > svg {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 20px;
  transition: all 0.4s ease-in;
 }
 
 .b7:hover > svg {
  font-size: 1.2em;
  transform: translateX(-5px);
 }
 
 .b7:hover {
  box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
  transform: translateY(-2px);
 }
`}
      </style>
      {/* button 7 */}
      <button class="b8">Submit</button>
      <style>
        {`
.b8{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}
.b8 {
  --clr-font-main: hsla(0 0% 20% / 100);
  --btn-bg-1: hsla(194 100% 69% / 1);
  --btn-bg-2: hsla(217 100% 56% / 1);
  --btn-bg-color: hsla(360 100% 100% / 1);
  --radii: 0.5em;
  cursor: pointer;
  padding: 0.9em 1.4em;
  min-width: 120px;
  min-height: 44px;
  font-size: var(--size, 1rem);
  font-family: "Segoe UI", system-ui, sans-serif;
  font-weight: 500;
  transition: 0.8s;
  background-size: 280% auto;
  background-image: linear-gradient(325deg, var(--btn-bg-2) 0%, var(--btn-bg-1) 55%, var(--btn-bg-2) 90%);
  border: none;
  border-radius: var(--radii);
  color: var(--btn-bg-color);
  box-shadow: 0px 0px 20px rgba(71, 184, 255, 0.5), 0px 5px 5px -1px rgba(58, 125, 233, 0.25), inset 4px 4px 8px rgba(175, 230, 255, 0.5), inset -4px -4px 8px rgba(19, 95, 216, 0.35);
}

.b8:hover {
  background-position: right top;
}

.b8:is(:focus, :focus-visible, :active) {
  outline: none;
  box-shadow: 0 0 0 3px var(--btn-bg-color), 0 0 0 6px var(--btn-bg-2);
}

@media (prefers-reduced-motion: reduce) {
  .btn-donate {
    transition: linear;
`}
      </style>
      {/* button  8*/}
      <button class="b9">
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front text"> Submit</span>
      </button>
      <style>
        {`
.b9{
  display:block;
  margin-bottom:10px;
}
.b9 {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  touch-action: manipulation;
 }
 
 .shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform
     600ms
     cubic-bezier(.3, .7, .4, 1);
 }
 
 .edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
     to left,
     hsl(340deg 100% 16%) 0%,
     hsl(340deg 100% 32%) 8%,
     hsl(340deg 100% 32%) 92%,
     hsl(340deg 100% 16%) 100%
   );
 }
 
 .front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform
     600ms
     cubic-bezier(.3, .7, .4, 1);
 }
 
 .b9:hover {
  filter: brightness(110%);
 }
 
 .b9:hover .front {
  transform: translateY(-6px);
  transition: transform
     250ms
     cubic-bezier(.3, .7, .4, 1.5);
 }
 
 .b9:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
 }
 
 .b9:hover .shadow {
  transform: translateY(4px);
  transition: transform
     250ms
     cubic-bezier(.3, .7, .4, 1.5);
 }
 
 .b9:active .shadow {
  transform: translateY(1px);
  transition: transform 34ms;
 }
 
 .b9:focus:not(:focus-visible) {
  outline: none;
 }
`}
      </style>
      {/* button 9 */}
      <button class="b11"> Submit</button>
      <style>
        {`
.b11{
  display:block;
  margin-bottom:10px;
  margin-top:10px;

}
.b11 {
  appearance: button;
  background-color: #1899D6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 19px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
 }
 
 .b11:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
 }
 
 .b11:main, button:focus {
  user-select: auto;
 }
 
 .b11:hover:not(:disabled) {
  filter: brightness(1.1);
 }
 
 .b11:disabled {
  cursor: auto;
 }
 
 .b11:active:after {
  border-width: 0 0 0px;
 }
 
 .b11:active {
  padding-bottom: 10px;
 }
`}
      </style>
      {/* button 10 */}
      <button class="b12"> Submit</button>
      <style>
        {`
.b12{
  display:block;
  margin-bottom:10px;
}
.b12 {
  background-color: #eee;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  width: 10em;
  border-radius: 1rem;
  color: lightcoral;
  cursor: pointer;
 }
 
 .b12:active {
  color: white;
  box-shadow: 0 0.2rem #dfd9d9;
  transform: translateY(0.2rem);
 }
 
 .b12:hover:not(:disabled) {
  background: #D63031;
  color: white;
  text-shadow: 0 0.1rem #bcb4b4;
 }
 
 .b12:disabled {
  cursor: auto;
  color: grey;
 }
`}
      </style>
      
      {/* button 11 */}
      <button class="b14"> Submit</button>
      <style>
        {`
.b14{
  display:block;
  margin-bottom:10px;
  margin-top:10px;
}
.b14 {
  font-size: 17px;
  padding: 0.5em 2em;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  background: dodgerblue;
  color: white;
  border-radius: 4px;
 }
 
 .b14:hover {
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(30,144,255,1) 0%, rgba(0,212,255,1) 100%);
 }
 
 .b14:active {
  transform: translate(0em, 0.2em);
 }
`}
      </style>
      {/* button 12
       */}
      <button class="b16">
        <span>Submit</span>
        <svg
          width="34"
          height="34"
          viewBox="0 0 74 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="37"
            cy="37"
            r="35.5"
            stroke="black"
            stroke-width="3"
          ></circle>
          <path
            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
            fill="black"
          ></path>
        </svg>
      </button>
      <style>
        {`
.b16 {
  cursor: pointer;
  font-weight: 700;
  font-family: Helvetica,"sans-serif";
  transition: all .2s;
  padding: 10px 20px;
  border-radius: 100px;
  background: #26ae60;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  font-size: 15px;
}

.b16:hover {
  background: #2ecc72;
}

.b16 > svg {
  width: 34px;
  margin-left: 10px;
  transition: transform .3s ease-in-out;
}

.b16:hover svg {
  transform: translateX(5px);
}

.b16:active {
  transform: scale(0.95);
}
`}
      </style>
    </div>
    
  );
}
