import { RanBOT } from "../../utils/common";
import logo from "../../assets/icons/logo.png";

function AiSummarizer(porps: { data: any, err: string | undefined }) {
  const { data, err } = porps;

  return (
    <section className="section" style={{ height: "100%" }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <div className="box p-5 has-background-grey">
              <div className="has-text-centered">
                <img src={logo} alt={RanBOT.name} style={{ borderRadius: "50%" }} />
              </div>
              {err && <h3>
                {err}
              </h3>}
              {!err && <>
                <h1 className="title has-text-centered has-text-white mt-5">
                  Hello! {data.name}
                </h1>
                <img src={data.picture} alt={data.name} style={{ borderRadius: "50%" }} />
              </>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSummarizer;
