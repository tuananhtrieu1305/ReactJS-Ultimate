import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const Language = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (Language) => {
    i18n.changeLanguage(Language);
  };

  return (
    <>
      <NavDropdown
        title={
          i18n.language === "vi"
            ? t("right_header.vi_lang")
            : t("right_header.en_lang")
        }
        id="basic-nav-dropdown2"
      >
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("vi")}
          className="vi_lang"
        >
          {t("right_header.vi_lang")}
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => handleChangeLanguage("en")}
          className="en_lang"
        >
          {t("right_header.en_lang")}
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
