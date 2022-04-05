import styled from "styled-components";

const Footer = () => {
    return (
        <Section>
            <Container>
                <div>.</div>
            </Container>
            <CopyR>
                <div>
                    <p> © copyright 2022 by </p>
                    <a
                        href="https://www.marcosjampietri.co.uk"
                        target="_blank"
                        rel="noreferrer"
                    >
                        marcosjampietri.co.uk
                    </a>
                </div>
            </CopyR>
        </Section>
    );
};

export default Footer;

const Section = styled.section`
    width: 100vw;
    height: 500px;
    padding: 20px 0px;

    background: hsla(206, 90%, 0%, 1);

    display: flex;
    justify-content: center;
    align-item: center;
    flex-wrap: wrap;
`;

const Container = styled.div`
    height: 80%;



    > div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    }
    ul {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    a {
        color: #007bff;
    }

    }
`;

const CopyR = styled.div`
    width: 100%;
    height: 20%;

    div {
        overflow: hidden;
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        text-align: center;

        border-top: 1px solid hsla(0, 0%, 20%, 1);
        P,
        a {
            font-size: 12px;
            color: #bebebe;
            margin-bottom: 10px;
        }
    }
`;
