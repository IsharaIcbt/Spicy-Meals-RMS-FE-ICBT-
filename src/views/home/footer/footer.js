import React from "react"
import { Assets } from "@src/assets/images"
import {
  ArrowRight,
  Cast,
  CheckCircle,
  DollarSign, Edit,
  ExternalLink,
  Grid, Headphones,
  Heart, HelpCircle,
  Info,
  Link, Mail, MapPin,
  MessageCircle, Phone, Settings
} from "react-feather"
import { Button } from "reactstrap"
import './footer.scss'
const FooterPage = () => {
  return (
    <div className={"full_footer"}>
      <div id="social_media" className="container-fluid">
        <div className="container text-center">
          <p> FIND US ON SOCIAL MEDIA</p>
          <div className="social_icons">
            <a href="#"><img src={Assets.facebook} /></a>
            <a href="#"><img src={Assets.instagram} /></a>
            <a href="#"><img src={Assets.twitter} /></a>
            <a href="#"><img src={Assets.whatsapp} /></a>
            <a href="#"><img src={Assets.linkedin} /></a>
            <a href="#"><img src={Assets.snapchat} /></a>
          </div>
        </div>
      </div>
      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 footer-box">
              <p><b>
                <Info size={20} /> Spicy Meals Restaurant App
              </b></p>
              <p>
                <small>Spicy Meals is an intuitive and personalized restaurant app designed to cater to your culinary
                  cravings. Experience a seamless journey through our diverse menu, tailored to match
                  your taste and preferences</small>
              </p>
              <Button color="success" className={"d-block btn-sm"}>
                <ArrowRight size={14} className="align-middle ms-sm-25 me-1"></ArrowRight>
                <span className="align-middle d-sm-inline-block d-none">  Free </span>
              </Button>

              <Button color="primary" className={"d-block mt-2 ps-2 btn-sm"}>
                <ArrowRight size={14} className="align-middle ms-sm-25 me-1"></ArrowRight>
                <span className="align-middle d-sm-inline-block d-none"> Contact Us .</span>
              </Button>
            </div>
            <div className="col-md-3 footer-box">
              <p className={"mb-2"}><b><ExternalLink size={20} /> QUICK LINKS </b></p>
              <p><a className="text-reset" href="#"> <Grid size={17} /> Home</a></p>
              <p><a className="text-reset" href="#"> <CheckCircle size={17} /> Services</a></p>
              <p><a className="text-reset" href="#"> <MessageCircle size={17} /> About</a></p>
              <p><a className="text-reset" href="#"> <Cast size={17} /> Blog</a></p>
            </div>

            <div className="col-md-3 footer-box">
              <p className={"mb-2"}><b><Link size={20} /> USE FULL LINKS</b></p>
              <p><a className="text-reset" href="#"> <Heart size={17} /> Events</a></p>
              <p><a className="text-reset" href="#"><DollarSign size={17} /> Pricing</a></p>
              <p><a className="text-reset" href="#"> <Settings size={17} /> Settings</a></p>
              <p><a className="text-reset" href="#"><HelpCircle size={17} /> Help</a></p>
            </div>

            <div className="col-md-3 footer-box">
              <p className={"mb-2"}><Edit size={22} /><b> CONTACT US</b></p>
              <p><MapPin size={17} /> Spicy Meals, Colombo</p>
              <p><Phone size={17} /> (+94)-123456789</p>
              <p><Headphones size={17} /> + 01 234 567 89</p>
              <p><Mail size={17} /> abcd@gmail.com</p>
            </div>
          </div>
          <hr />
          <p className="copyRight">
            <small> CopyRight © 2024 All Right Reserved . <br /> ~ Website Developed by
              Ishara Maduranga. ~ </small>
          </p>
        </div>
      </section>

    </div>
  )
}

export default FooterPage
