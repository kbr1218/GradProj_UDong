import { useEffect, useState } from "react";

const useKoreaTime = () => {
    const [koreaTime, setKoreaTime] = useState("");

    useEffect(() => {
        const getKoreaTime = () => {
            const now = new Date();
            const GMTNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
            const KoreaTimeDiff = 9 * 60 * 60 * 1000;
            const KoreaNow = new Date(GMTNow + KoreaTimeDiff);
            const isoDateTime = new Date(KoreaNow.getTime() - KoreaNow.getTimezoneOffset() * 60000).toISOString();

            setKoreaTime(isoDateTime);
        };

        const interval = setInterval(getKoreaTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return koreaTime;
};

export default useKoreaTime;
