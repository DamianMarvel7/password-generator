import React, { useState } from "react";
import iconCopy from "../assets/images/icon-copy.svg";
import iconArrowRight from "../assets/images/icon-arrow-right.svg";
import iconCheck from "../assets/images/icon-check.svg";
import {
  PasswordStrengthIndicator,
  generateRandomPassword,
  getPasswordStrength,
} from "../helper";

const PasswordGenerator = () => {
  const [charLength, setCharLength] = useState(1);
  const [colorPass, setcolorPass] = useState("hsl(251, 9%, 53%)");
  const [currentPass, setCurrentPass] = useState("P4$5W0rD!");
  const [passStrength, setPassStrength] = useState("");
  const [barColor, setBarColor] = useState("");

  const handleLength = (e) => {
    setCharLength(e.target.value);
  };

  const handleGenerate = () => {
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    console.log();

    const password = generateRandomPassword(
      charLength,
      uppercaseCheckbox.checked,
      lowercaseCheckbox.checked,
      numbersCheckbox.checked,
      symbolsCheckbox.checked
    );
    const passwordStrength = getPasswordStrength(
      charLength,
      uppercaseCheckbox.checked,
      lowercaseCheckbox.checked,
      numbersCheckbox.checked,
      symbolsCheckbox.checked
    );

    setCurrentPass(password);
    setPassStrength(passwordStrength.label);
    setBarColor(passwordStrength.color);
    setcolorPass("hsl(252, 11%, 91%)");
  };

  const barsCount = PasswordStrengthIndicator(passStrength);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentPass);

    const copiedText = document.querySelector(".copied-text");
    copiedText.style.display = "block";

    setTimeout(() => {
      copiedText.style.display = "none";
    }, 800);
  };

  return (
    <main>
      <section className="container flow">
        <p className="title clr-light-grey">Password Generator</p>
        <div className="password-content flex container bg-grey">
          <p className="headingL" style={{ color: colorPass }}>
            {currentPass}
          </p>
          <div className="flex">
            <span className="copied-text">COPIED</span>
            <img
              src={iconCopy}
              alt=""
              className="icon-copy"
              onClick={handleCopyToClipboard}
            />
          </div>
        </div>
        <div className="password-criteria container bg-grey flow">
          <div className="password-length">
            <p className="flex">
              Character Length <span className="green">{charLength}</span>
            </p>
            <input
              type="range"
              min="1"
              max="20"
              value={charLength}
              step="1"
              onChange={handleLength}
              className="slider"
              style={{ backgroundSize: `${(charLength / 20) * 100 - 1}%` }}
            />
          </div>

          <div>
            <div className="inputCheck">
              <input
                type="checkbox"
                name="criteria"
                id="uppercase"
                className="hidden"
              />
              <label htmlFor="uppercase" className="labelCheck">
                <img src={iconCheck} alt="" className="iconCheck" />
              </label>
              <label htmlFor="uppercase">Include Uppercase Letter</label>
            </div>
            <div className="inputCheck">
              <input
                type="checkbox"
                name="criteria"
                id="lowercase"
                className="hidden"
              />
              <label htmlFor="lowercase" className="labelCheck">
                <img src={iconCheck} alt="" className="iconCheck" />
              </label>
              <label htmlFor="lowercase">Include Lowercase Letter</label>
            </div>
            <div className="inputCheck">
              <input
                type="checkbox"
                name="criteria"
                id="numbers"
                className="hidden"
              />
              <label htmlFor="numbers" className="labelCheck">
                <img src={iconCheck} alt="" className="iconCheck" />
              </label>
              <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div className="inputCheck">
              <input
                type="checkbox"
                name="criteria"
                id="symbols"
                className="hidden"
              />
              <label htmlFor="symbols" className="labelCheck">
                <img src={iconCheck} alt="" className="iconCheck" />
              </label>
              <label htmlFor="symbols">Include Symbols</label>
            </div>
          </div>

          <div className="password-strength flex bg-black container">
            <p className="clr-light-grey">STRENGTH</p>
            <div className="strength-bar flex">
              <p className="fs-400">{passStrength}</p>
              <div className="strength-bar">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="rectangle"
                    style={{
                      backgroundColor:
                        index < barsCount ? barColor : "transparent",
                      border: index < barsCount ? "none" : "",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn" onClick={handleGenerate}>
            <span>GENERATE</span> <img src={iconArrowRight} alt="" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default PasswordGenerator;
