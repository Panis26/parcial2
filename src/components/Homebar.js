import imgHomebar from '../images/homebar.jpg';

function Homebar(){
    return(
        <div>
            <div className="homebar-tittle">
                <h1>El aroma mágico</h1>
             </div>
            <div className="homebar-img">
                <img src={imgHomebar} alt="homebar"/>
            </div>
        </div>
    
    )
}

export default Homebar;