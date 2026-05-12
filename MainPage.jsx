import {useNavigate} from 'react-router-dom'
import "./Text.css";
import "./Button.css";

function IntroText (){
    return(
        <div>
            <h1>Welcome to ReHabit!</h1>
            <h3>This website is focused on helping people recover from substance use and dependency. We aim to help people find and locate nearby and avialble resources. Since you are here, you've already compeleted the first step of addiction recovery, which is admitting you have a problem reaching out for help. Good job for taking the initiative and reaching out for help!</h3>
        </div>
       );
    }

function StartButton (){
    const navigate = useNavigate();

    return(
        <button onClick={()=>navigate('/map')}>Start!</button>
    );
}
    
function MainPage() {
        return(
            <div>
                <IntroText />
                <StartButton />
            </div>
        );
}

export default MainPage;