import { AppButton } from 'components/button';
import useEyeDropper from '../../hooks/use-eye-dropper';
import eyeDropper from '../../assets/eye-dropper.svg';

type Props = {
    onChange: (color: string) => void;
    onEyeDropError: (e: any) => void;
};

export const EyeDropper = ({ onChange, onEyeDropError }: Props) => {
    const { open } = useEyeDropper();
    const handleOpen = async () => {
        try {
            const color = await open();
            onChange(color.sRGBHex);
        } catch (e) {
            onEyeDropError(e);
        }
    };
    return (
        <>
            <AppButton
                onClick={handleOpen}
                color='white'
                icon={eyeDropper}
            ></AppButton>
        </>
    );
};
