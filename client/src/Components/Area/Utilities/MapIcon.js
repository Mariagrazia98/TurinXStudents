import SchoolIcon from '@mui/icons-material/School';
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'

export const getRequiredSVGPinByCategory = () => { 
    let pin = <SchoolIcon style={{width:"37", height:"45"}}/>
    
    const iconMarkup = renderToStaticMarkup(
       pin
    )
    const customMarketIcon = divIcon({
        html: iconMarkup
    })
    return customMarketIcon
}