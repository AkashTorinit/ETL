import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { Alert } from '@mui/material'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));


const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions(props: any) {


  let { prop,HandlePasswordChange } = props
  const [confirmNewPassword, setconfirmNewPassword] = React.useState<string>('')
  const [newPassword, setnewPassword] = React.useState<string>('')
  const [expanded, setExpanded] = React.useState(false)
 

  const handleChange = (email: any) => {
    setExpanded(!expanded);
  };


  const handleFormSubmit = async(e: any) => {
    e.preventDefault()
    

      const formBody: any = {
        email: prop,
        newPassword:newPassword,
        confirmNewPassword:confirmNewPassword
        
      }
     
      console.log("form>>",formBody)  

      HandlePasswordChange(formBody)

      setExpanded(false);
      
     
     
    
  }
  return (
    <div style={{width:'auto'}}>
      <Accordion sx={{ width: {md:'17rem',sm:'17rem'} }} expanded={expanded} >
        <AccordionSummary sx={{width:'17rem'}} aria-controls="panel1d-content" id="panel1d-header" onClick={(e) => handleChange(prop)}>
          <Typography sx={{fontSize:'13px'}}>Change Password</Typography>
        </AccordionSummary>
   
          <form method="POST" encType="multipart/form-data" style={{ width: '5rem',marginLeft: '1rem' }} onSubmit={handleFormSubmit} >





            <input className="login__input" id='newPassword' name='newPassword' required={true} type="password" placeholder='New Password'  onChange={(e) => setnewPassword(e.target.value)} style={{width:'15rem'}} />

            <input className="login__input" id='confirmNewPassword' name='confirmNewPassword' type="password" required={true} placeholder='Confirm New Password'  onChange={(e) => setconfirmNewPassword(e.target.value)} style={{width:'15rem'}} />


            <button className="login__submit" type="submit" style={{ fontFamily: 'Steradian', display: 'block', color: '#ffffff',width:'12rem',margin:'inherit',marginBottom:'1rem' }}>Submit</button>
          </form>
       
      </Accordion>

    

    </div>
  );
}
