import { RanBOT } from "../../utils/common";
import logo from "../../assets/icons/logo.png";

function AiSummarizer(porps: { gasUserName: string  }) {
  const { gasUserName } = porps;

  return (
    <section className="section" style={{ height: "100%" }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="box p-5 has-background-grey">
              <div className="has-text-centered">
                <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
              </div>
              <h1 className="title has-text-centered has-text-white mt-5">
                Hello! {gasUserName}
                - {document.URL}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSummarizer;
