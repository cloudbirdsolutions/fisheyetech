import * as React from 'react';
import Input, { InputProps } from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

type DebounceProps = {
    handleDebounce: Function;
    debounceTimeout: number;
};

export default function DebounceInput(props: InputProps & DebounceProps) {
    const { handleDebounce, debounceTimeout, ...rest } = props;

    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            handleDebounce(event.target.value);
        }, debounceTimeout);
    };

    return <Input {...rest} onChange={handleChange} />;
}

// export default function DebouncedInput() {
//     const [debouncedValue, setDebouncedValue] = React.useState('');
//     const handleDebounce = (value: string) => {
//         setDebouncedValue(value);
//     };
//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <DebounceInput
//                 placeholder="Type in here…"
//                 debounceTimeout={1000}
//                 handleDebounce={handleDebounce}
//             />
//             <Typography>Debounced input: {debouncedValue}</Typography>
//         </Box>
//     );
// }