'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import { useParams } from 'next/navigation'
import { AccordionGroup, FormControl, FormLabel, Tab, TabList, TabPanel, Tabs, Typography, Table, Sheet, Button, Stack, Link } from '@mui/joy';
import { Accordion, AccordionDetails, AccordionSummary, Input } from '@mui/joy';

interface LogProps {
  sheetid: string
}

async function getSheetFields(sheetid: string) {
  try {

    const response = await fetch(`http://51.79.147.139:3000/forms/get?id=${sheetid}`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details: ' + response.statusText);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

export default function Log() {
  const params = useParams<{ sheet: string, id: string }>()
  const [parameters, setParameters] = useState({ id: "", sheetName: "", description: "", parameterMaster: [{id:"",parameterName:"", fieldMaster:[{fieldName:"",fieldId:""}]}] });

  React.useEffect(() => {

    const fetchData = async () => {
      let resposne = await getSheetFields(params.id)
      setParameters(resposne.data)
    }
    fetchData()


  }, [params])


  return (
    <Box sx={{ display: 'flex' }} marginTop={2}>
      <Box>
        <Stack direction={'row'} justifyContent="space-between" spacing={2} marginBottom={2}>
        <Typography level='title-lg' component="h1" sx={{ marginBottom: "12px" }}>{parameters.sheetName}</Typography>
        <Link
              underline="hover"
              color="neutral"
              href="/tasks"
              fontSize={12}
              fontWeight={500}
            >
              Go Back to Task List
            </Link>
        </Stack>
        <Tabs>
          <TabList>
            <Tab>Shift A</Tab>
            <Tab>Shift B</Tab>
            <Tab>Shift C</Tab>
          </TabList>
          <TabPanel value={0} sx={{height: 540, overflow: 'auto'}}>
            {parameters.parameterMaster && <AccordionGroup size='sm' sx={{ minWidth: "60dvw" }} >
              {
                parameters.parameterMaster.map((paramter) => (
                  <Accordion key={`paramater_${paramter.id}`}>
                    <AccordionSummary sx={{ backgroundColor: 'var(--joy-palette-background-backdrop)' }}>
                      {paramter.parameterName}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Sheet sx={{ height: 400, overflow: 'auto' }}>
                      <Table stickyFooter hoverRow >
                        <tbody>
                          {

                            paramter.fieldMaster && paramter.fieldMaster.map((field) => (

                              <tr key={`field_${field.fieldId}`}>
                                <td>
                                  {field.fieldName}
                                </td>
                                <td>
                                  <Input size='sm' />
                                </td>
                              </tr>

                            ))

                          }
                        </tbody>
                      </Table>
                      </Sheet>
                    </AccordionDetails>
                  </Accordion>
                ))
              }

            </AccordionGroup>
            }
            <Box sx={{display:'flex', gap:'4', position:'absolute', right:'14px', bottom:'18px'}}>
              <Stack direction={'row'} spacing={2}>
              <Button size='sm' color='primary'>
                Save
              </Button>
              <Button size='sm' color='success'>
                Submit for Approval
              </Button>
              </Stack>
            </Box>
          </TabPanel>
        </Tabs>

      </Box>
    </Box>

  );
}
