import styled from "styled-components"
import ReactPlayer from 'react-player/lazy';
import { useRef } from "react";

const VideoBox = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: left;
    align-items: center;
`
const Video = (props) => {
    const videdoBox = useRef();
    const handleVideo = () => {
        videdoBox.current.style.display = 'none'
        props.setvideo('')
      }
      console.log(props.video)
    return(
        <>
            <VideoBox ref={VideoBox}>
                <ReactPlayer
                    className='react-player'
                    url={props.video}
                    // url={props.video}    // 플레이어 url
                    width='500px'         // 플레이어 크기 (가로)
                    height='300px'        // 플레이어 크기 (세로)
                    playing={true}        // 자동 재생 on
                    muted={true}          // 자동 재생 on
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                />
            </VideoBox>
        </>
    )
}

export default Video