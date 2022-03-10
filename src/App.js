import React ,{useState} from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Slider, Table, TableRow, TableCell } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import TableDetails from './TableDetails';
import SliderMarks from './SliderMarks';

const PrettoSlider = withStyles({
  root : {color:'MediumVioletRed', height:10},
  thumb:{height:20, width:20, background:'white', border:'3px solid black', marginTop: -5, marginLeft: -5},
  track:{height:10, borderRadius:6},
  rail:{height:10, borderRadius:6},
})(Slider);


function App() {
  
  const [pAmount, setpAmount]  = useState(2755000);
  const[interest, setInterest] = useState(7);
  const [duration, setDuration] = useState(147);
  const maxValue = 6000000;
  const inmax = 20;
  const maxDuration = 360;

  const intr = interest/1200;
  const emi = duration ? Math.round(pAmount*intr / (1 - (Math.pow(1/(1 + intr ), duration)))) :0;
  const totalAmt = duration * emi;
  var TotalAmountofCredit = Math.round((emi / intr) * (1- Math.pow((1 + intr), (-duration))));
  const TotalAmountofInterest = Math.round(totalAmt - TotalAmountofCredit);
  
  
  
  return (
    <div className="App">
      <div className='CalApp'>
        <h2 className='CalHeading'><u>EMI Calculator</u></h2>  
          <div>
            <Typography gutterBottom><strong>Loan Amount</strong></Typography>
            <PrettoSlider value={pAmount} marks={SliderMarks.marksAmt} onChange={(event, vAmt)=>{setpAmount(vAmt)}} defaultValue={pAmount} max={maxValue}/>
          </div>
          <div>
          <Typography gutterBottom><strong>Interest Rate %</strong></Typography>
            <PrettoSlider value={interest} marks={SliderMarks.marksInt} onChange={(event, vInt)=>{setInterest(vInt)}} defaultValue={inmax} max={maxValue}/>
          </div>
          <div>
          <Typography gutterBottom><strong>Tenure (Months)</strong></Typography>
            <PrettoSlider value={duration} marks={SliderMarks.marksTenure} onChange={(event, vDur)=>{setDuration(vDur)}} defaultValue={maxDuration} max={maxValue}/>
          </div>
          <div>
          <Table>
            <TableRow>
              <TableCell>
                <TableDetails pAmount={pAmount} totalAmt={totalAmt} interest = {interest} duration={duration} emi={emi} TotalAmountofInterest={TotalAmountofInterest} />
              </TableCell>
              <TableCell>
                <Pie 
                data ={{
                  labels:['Total Interest', 'Total Amount'],
                  datasets:[{
                    data:[TotalAmountofInterest,pAmount],
                    backgroundColor:['red', 'blue']
                  }]
                }}
                width={200}
                height = {200}
                />
              </TableCell>

            </TableRow>
          </Table>
          </div>
      </div>
      
    </div>
  );
}

export default App;
