function AiSummarizer(porps: { gasUserName: string  }) {
  const { gasUserName } = porps;

  return (
    <section
      className="hero is-info is-fullheight"
    >
      Home - {gasUserName}
    </section>
  );
}

export default AiSummarizer;
