// @flow
import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./AccountLayout.module.css";

// images
//import Logo from '../../assets/images/logo.png';

type AccountLayoutProps = {
  bottomLinks?: React$Element<any>;
  children?: any;
};

const AccountLayout = ({
  bottomLinks,
  children,
}: AccountLayoutProps): React$Element<any> => {
  const { t } = useTranslation();

  useEffect(() => {
    if (document.body) document.body.classList.add("authentication-bg");

    return () => {
      if (document.body) document.body.classList.remove("authentication-bg");
    };
  }, []);

  return (
    <>
      <div className={styles[`account-layout`]}>
        <div className={styles[`background-container`]}>
          <div className={styles[`form-container`]}>
            {children}
            {/* bottom links */}
            {bottomLinks}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLayout;
