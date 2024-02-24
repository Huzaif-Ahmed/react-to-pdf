// pages/preview.tsx
'use client'
import { useRouter } from 'next/navigation';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink,Font } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useState } from 'react';

import dynamic from 'next/dynamic';


Font.register({ family: 'Roboto', src: 'http://fonts.gstatic.com/s/risque/v4/iFA7a9Hk8IxDgPVBx7IE_Q.ttf' });

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);


const styles = StyleSheet.create({
    page: {  padding: 30,width:'794px',height:"1123px"},
    section: { flexGrow: 0 },
    row: { flexDirection: 'row',width:'400px' ,height:' 40px'},
    namesubt: { fontSize: 12,width:'350px',  padding: 9,height:' 40px',border: '3px solid black'},
    age:{ fontSize: 12 ,width:'100px',borderStyle: 'solid', padding: 9 ,height:' 40px',border: '3px solid black'},
    heading:{ fontSize: 13 ,height:' 40px',fontWeight: 'extrabold'},
    Department:{ fontSize: 14 ,height:' 40px',fontWeight: 'extrabold',width:'650px',border: '3px solid black', padding: 9},
    
    
    // table: { width: 'auto', borderStyle: 'solid', borderWidth: 1 },
    // row: { flexDirection: 'row' },
    // col: { flexGrow: 1, borderStyle: 'solid', borderWidth: 1, padding: 5 },
  });
  

interface Data {
    employeeName: string;
    date: string;
    department: string;
}
const MyDocument = ( { data }: { data: Data }  ) => (
  <Document style={{width:'794px',height:"1123px"}}>
    <Page size="A4" style={styles.page}>
      <View>
        <div className='flex ' style={styles.row} >
        <Text style={styles.namesubt}><Text style={styles.heading}>Name of Employee: </Text>{data.employeeName}</Text><Text style={styles.age}><Text style={styles.heading}> AGE :</Text>15 </Text>
        </div>
        <div className='flex ' style={styles.row} >
        <Text style={styles.Department}>Name of the department:<Text style={styles.namesubt}>{data.department}</Text></Text>
        </div>
        <div className='flex ' style={styles.row} >
        <Text style={styles.Department}>Name of the department:<Text style={styles.namesubt}>{data.department}</Text></Text>
        </div>
          
        
        {/* <Text style={styles.name}>Date: {data.date}</Text>
        <Text style={styles.name}>Department: {data.department}</Text> */}
        {/* ... rest of the form as per your design ... */}
      </View>
    </Page>
  </Document>
);

const page = ( ) => {
  const [data, setdata] = useState({employeeName: '', date: '', department: ''});
  useEffect(() => {
    const data = localStorage.getItem('data');
    console.log(data);
    if (data) {
      setdata(JSON.parse(data));
    }
  }, []);
  return (
    <div>
      <h1>Preview Safety Orientation Form</h1>
      <PDFViewer width={'80%'} height={'930px'} >
        <MyDocument data={data}/>
      </PDFViewer>
      {/* The component to render the PDF in the browser */}
      <PDFDownloadLink
        document={<MyDocument data={data} />}
        fileName="safety-orientation-form.pdf"
      >
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};




export default page;
