import React from "react";
import "./index.css";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";
class Login extends React.Component {
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  state = {
    isSignin: true,
    isotp: false,
    isSuccess: false,
  };

  signInPage = () => {
    return (
      <div>
        <div id="recaptcha-container"></div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.szYvtm6FyEJuuUY3PEg9RwHaE2&pid=Api&P=0&h=180"
            className="m-3"
          />

          <h1 className="m-2">Welcome Back</h1>
          <p className="m-2 text-dark">Please sign in to your account</p>
          <form
            onSubmit={this.onSignInSubmit}
            className="d-flex flex-column justify-content-center align-items-center m-2"
          >
            <input
              type="number"
              name="mobile"
              placeholder="Enter Contact Number"
              required
              onChange={this.handleChange}
              className="form-control m-3 w-75 font-weight-bold"
            />
            <p className="text-center m-1 text-dark">
              we will send you a one time SMS message.Charges May apply
            </p>
            <button
              type="submit"
              className="sign-in m-4"
              onClick={this.signInOtp}
            >
              Sign in with OTP
            </button>
          </form>
        </div>
      </div>
    );
  };

  otpPage = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1695759149/Screenshot_2023-09-27_014147_oixk6s.png"
          className="m-2"
        />
        <h4 className="font-weight-bold">Please Verify mobile Number</h4>
        <p className="m-2"> An OTP sent to +91{this.state.mobile}</p>
        <p className="change">change Phone NUmber</p>
        <form
          onSubmit={this.onSubmitOtp}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <input
            type="number"
            name="otp"
            placeholder="enter your number"
            required
            onChange={this.handleChange}
            className="form-control w-75 font-weight-bold"
          />
          <p className="text-dark m-3">
            Didn't receive the Code ?
            <span className="text-warning">Resend</span>
          </p>
          <button type="submit" className="sign-in">
            verify
          </button>
        </form>
      </div>
    );
  };

  successPage = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
        <img
          src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1695760399/Screenshot_2023-09-27_020302_txmyr0.png"
          className="m-2 mt-2"
        />
        <h1 className="m-2 text-center">Welcome to AdmitKard</h1>
        <p className="text-dark m-2">
          In order to provide you with a custom experience
        </p>
        <p className="font-weight-bold">We need to ask you a few questions</p>
        <button className="sign-in mt-4">Get Started</button>
        <p className="text-dark">*This will only take 5 min</p>
      </div>
    );
  };

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyAvorROx1pgxy4OTp0YVHeQZsStLzmhRXE",
      authDomain: "otp-verification-e4cc7.firebaseapp.com",
      projectId: "otp-verification-e4cc7",
      storageBucket: "otp-verification-e4cc7.appspot.com",
      messagingSenderId: "571155012350",
      appId: "1:571155012350:web:f5993e8ad5d5b8680d23af",
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          this.onSignInSubmit();
          console.log("captcha verified");
        },
        // defaultCountry:'IN'
        "expired-callback": () => {},
        // defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();

    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("otp  successfully sent");
        this.setState({ isotp: true, isSignin: false });
      })
      .catch((error) => {
        console.log("SMS not sent");
      });
  };

  onSubmitOtp = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));

        this.setState({ isotp: false, isSignin: false, isSuccess: true });
      })
      .catch((error) => {});
  };

  render() {
    const { isSignin, isotp, isSuccess } = this.state;
    return (
      <div className="bg-container d-flex flex-column justify-content-center align-items-center">
        <div id="recaptcha-container"></div>
        {isSignin && this.signInPage()}
        {isotp && this.otpPage()}
        {isSuccess && this.successPage()}
      </div>
    );
  }
}
export default Login;
