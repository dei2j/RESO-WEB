import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({
    value,
    prefix = '',
    suffix = '',
    decimals = 0,
    className = ''
}) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 80,
        damping: 20
    });
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                const formattedNumber = latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                ref.current.textContent = formattedNumber;
            }
        });

        return () => unsubscribe();
    }, [springValue, decimals]);

    const initialFormatted = (0).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <span className={`tabular-nums ${className}`.trim()}>
            {prefix ? <span>{prefix}</span> : null}
            <span ref={ref} className="tracking-tighter">{initialFormatted}</span>
            {suffix ? <span>{suffix}</span> : null}
        </span>
    );
};

export default Counter;
