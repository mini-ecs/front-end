import VncDisplay from 'react-vnc-display';
const VNC = () => {
  return (
    <>
      {/* <VncDisplay url="wss://some-remote-display:5991/path" /> */}
      <VncDisplay url="ws://10.249.46.250:10101" />
    </>
  );
};

export default VNC;
