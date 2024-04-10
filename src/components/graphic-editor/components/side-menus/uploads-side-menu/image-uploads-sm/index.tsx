import trash from '../../../../assets/trash.svg';

type Props = {
  onClick: (src: string) => Promise<void>;
  onDelete: (index: number) => void;
  src: string;
  index: number;
};

export const ImageUploadsSM = ({ onClick, onDelete, src, index }: Props) => {
  return (
    <button style={{ position: 'relative' }} onClick={() => onClick(src)}>
      <img style={{ maxWidth: '100%' }} src={src} alt="" />
      <img
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        role="button"
        style={{
          width: '24px',
          aspectRatio: 1,
          position: 'absolute',
          top: '4px',
          right: '4px',
          backgroundColor: '#fcfcfd',
          borderRadius: '4px',
          stroke: 'white',
        }}
        src={trash}
        alt=""
      />
    </button>
  );
};
