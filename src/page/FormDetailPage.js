import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom';
import $ from 'jquery';
import DatePicker from "react-datepicker";
//For API Requests
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../config/constants';
import { addDays } from 'date-fns';
import validator from 'validator'
function FormDetailPage() {
  let navigate = useNavigate();
  const [contentAction, setContentAction] = useState('content-hide');
  const [spinnerAction, setSpinnerAction] = useState('');
  const [contentActionChild, setContentActionChild] = useState('content-hide');
  const [spinnerActionChild, setSpinnerActionChild] = useState('');
  const [show, setShow] = useState(false);
  const [nameMother, setnameMother] = useState('');
  const [ageMother, setAgeMothers] = useState('');
  const [agePregnancy, setAgePregnancy] = useState('');
  const [parturitionProcess, setParturitionProcess] = useState('Pilih Jenis Proses');
  const [dateMaternity, setDateMaternity] = useState(new Date());
  const [longChild, setLongChild] = useState('');
  const [weightChild, setWeightChild] = useState('');
  const [methodButton, setMethodButton] = useState('');
  const [dataChild, setDataChild] = useState([]);
  const [childId, setChildId] = useState(0);
  const [genderChild, setGenderChild] = useState('Pilih Gender');
  const [conditionChild, setConditionChild] = useState('Pilih Kondisi');
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setGenderChild('Pilih Gender');
    setConditionChild('Pilih Kondisi');
    setLongChild('');
    setWeightChild('');
    setMethodButton('');
    setChildId(0);
    setChildId(0);
    setMethodButton('')
  };
  const idUrl = useParams();
  useEffect(() => {
    $(document).ready(function () {
      setTimeout(function () {
        $('#example').DataTable();
      }, 1000);
    });
  });
  useEffect(() => {
    LoadingData();
    LoadingChild();
    // eslint-disable-next-line  
  }, []);
  const selectPartus = [
    'Normal',
    'Dibantu alat',
    'Caesar',
    'Waterbirth'
  ];
  const LoadingData = () => {
    setSpinnerAction('');
    setContentAction('content-hide');
    axios.get(API_URL + 'patient/' + idUrl.id)
      .then(response => {
        if (response.data.type === 0) {
          setSpinnerAction('spinner-hide');
          setContentAction('');
          setnameMother(response.data.data.birth.name_mother);
          setAgePregnancy(response.data.data.birth.age_pregnancy);
          setAgeMothers(response.data.data.birth.age_mother);
          setDateMaternity(new Date(response.data.data.birth.datetime_maternity));
          setParturitionProcess(response.data.data.birth.parturition_process);
        } else {
          navigate('/');
        }
      }).catch(e => {

      })
  }
  const seletedGender = (gender)=>{
      setGenderChild(gender);
  }
  const seletedCondition = (condition)=>{
    setConditionChild(condition)
  }
  const LoadingChild = () => {
    setSpinnerActionChild('');
    setContentActionChild('content-hide');
    axios.get(API_URL + 'child/' + idUrl.id)
      .then(response => {
        if (response.data.type === 0) {
          setSpinnerActionChild('spinner-hide');
          setContentActionChild('');
          setDataChild(response.data.data.child);
        } else {
          setSpinnerActionChild('spinner-hide');
          setContentActionChild('');
        
        }
      }).catch(e => {

      })
  }
  const coditionChild = [
    'sehat', 'cacat', 'meninggal'
  ];
  const ButtonSava = () => {
    const parameter =
    {
      id: idUrl.id,
      nameMother: nameMother,
      ageMother: ageMother,
      agePregnancy: agePregnancy,
      datetimeMaternity: dateMaternity,
      parturitionProcess: parturitionProcess
    }
    if (validator.isEmpty(nameMother)) {
      Swal.fire({
        icon: 'warning',
        text: 'Nama Ibu Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (ageMother === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Ibu Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (ageMother !== '' && (!validator.isNumeric(ageMother))) {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Ibu Harus Angka',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (agePregnancy === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Kehamilan Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (agePregnancy !== '' && (!validator.isNumeric(agePregnancy))) {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Kehamilan Harus Angka',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (dateMaternity === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Tanggal Melahirkan Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (parturitionProcess === 'Pilih Jenis Proses') {
      Swal.fire({
        icon: 'warning',
        text: 'Proses Partus Belum dipilih',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      axios.put(API_URL + 'patient', parameter)
        .then(response => {
          if (response.data.type === 0) {
            Swal.fire({
              icon: 'success',
              text: response.data.message,
              showConfirmButton: false,
              timer: 1500
            });
            LoadingData();
          } else {
            Swal.fire({
              icon: 'error',
              text: response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          }

        }).catch(e => {
          console.log(e)
        })
    }

  }
  const ButtonSaveChild = (method) => {
    const paramaterChild = {
      id: childId,
      birthId: idUrl.id,
      genderChild: genderChild,
      longChild: longChild,
      weightChild: weightChild,
      conditionChild: conditionChild,
    }
    if (longChild === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Panjang Bayi Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (longChild !== '' && (!validator.isNumeric(longChild))) {
      Swal.fire({
        icon: 'warning',
        text: 'Panjang Bayi Harus Angka',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (weightChild === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Berat Bayi Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (weightChild !== '' && (!validator.isNumeric(weightChild))) {
      Swal.fire({
        icon: 'warning',
        text: 'Berat Bayi Harus Angka',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (genderChild === 'Pilih Gender') {
      Swal.fire({
        icon: 'warning',
        text: 'Gender Bayi Belum dipilih',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (conditionChild === 'Pilih Kondisi') {
      Swal.fire({
        icon: 'warning',
        text: 'Kondisi Bayi Belum dipilih',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (method === '') {
        axios.post(API_URL + 'child', paramaterChild)
          .then(response => {
            if (response.data.type === 0) {
              Swal.fire({
                icon: 'success',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
              setShow(false);
              LoadingChild();
            } else {
              Swal.fire({
                icon: 'error',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              })
            }
          }).catch(e => {
            console.log(e)
          })
      } else {
        axios.put(API_URL + 'child', paramaterChild)
          .then(response => {
            if (response.data.type === 0) {
              Swal.fire({
                icon: 'success',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
              setShow(false);
              LoadingChild();
            } else {
              Swal.fire({
                icon: 'error',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              })
            }

          }).catch(e => {
            console.log(e)
          })
      }
    }

  }
  const ButtonEdit = (id) => {
    axios.get(API_URL + 'child/' + id + '/edit')
      .then(response => {
        if (response.data.type === 0) {
          setLongChild(response.data.data.child.child_long);
          setWeightChild(response.data.data.child.child_weight);
          setMethodButton('put');
          setChildId(response.data.data.child.child_id);
          setGenderChild(response.data.data.child.child_gender);
          setConditionChild(response.data.data.child.child_condition);
          setShow(true)

        } else {
          navigate('/');
        }
      }).catch(e => {

      })
  }
  const DeleteChild = (id) => {
    Swal.fire({
      text: 'Yakin Ingin Hapus',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#228B22',
      cancelButtonColor: '#d33',
      confirmButtonText: "Iya",
      cancelButtonText: "Batal",
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + 'child/' + id)
          .then(response => {
            if (response.data.type === 0) {
              Swal.fire({
                icon: 'success',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
              LoadingChild();
            } else {
              Swal.fire({
                icon: 'error',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              })
            }
          }).catch(e => {

          })
      }
    })

  }
  const seletedPartus = (data) => {
    setParturitionProcess(data);
  }
  return (
    <>
      <Container>
        <Row>
        <Col lg={12}>
            <Card className='mt-5 mb-1'>
              <Card.Body>
                  <Link to="/"><Button className='btn btn-default'>Kembali</Button></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12}>
            <Card className='mt-2 mb-1'>
              <Card.Body>
                  <h4>Form Data Ibu</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} id={contentAction}>
            <Card className='mt-1 mb-5'>
              <Card.Body>
                <Form>
                  <Row>
                    <Col lg={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nama Ibu</Form.Label>
                        <Form.Control type="text" defaultValue={nameMother} placeholder="" onChange={(e) => setnameMother(e.target.value)} />
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Umur Ibu</Form.Label>
                        <InputGroup className="mb-3">
                          <Form.Control type='text' defaultValue={ageMother} onChange={(e) => setAgeMothers(e.target.value)} />
                          <InputGroup.Text id="basic-addon2">Tahun</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Umur Kehamilan</Form.Label>
                        <InputGroup className="mb-3">
                          <Form.Control type='text' defaultValue={agePregnancy} onChange={(e) => setAgePregnancy(e.target.value)} />
                          <InputGroup.Text id="basic-addon2">Bulan</InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tanggal Persalinan</Form.Label>
                        <DatePicker
                          selected={dateMaternity}
                          onChange={(date) => setDateMaternity(date)}
                          peekNextMonth
                          showTimeSelect
                          dateFormat="dd-MM-yyyy h:mm aa"
                          showMonthDropdown
                          minDate={addDays(new Date(), -6)}
                          showYearDropdown
                          dropdownMode="select"
                          className='form-control'
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Proses Partus</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option>{parturitionProcess}</option>
                          {
                            selectPartus.map((partus, index) => (
                              <option key={index} onClick={() => seletedPartus(partus)}>{partus}</option>
                            ))
                          }
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={{ span: 6, offset: 6 }}>
                      <Button variant="success" onClick={() => ButtonSava()}>Update</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} className='text-center' id={spinnerAction}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
        <Row>
          <Col lg='12'>
            <Button className='btn btn-success' onClick={handleShow}>Masuk Data Anak</Button>
          </Col>
          <Col lg={12}>
            <Card className='mt-5 mb-1'>
              <Card.Body>
                  <h4>Data Melahirkan Anak</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col lg='12 mt-3' id={contentActionChild}>
            <Card>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Gander Bayi</th>
                      <th>Panjang Bayi</th>
                      <th>Berat Bayi</th>
                      <th>Kondisi Bayi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataChild.map((childData, index2) => (
                      <tr key={index2}>
                        <td><Button onClick={() => ButtonEdit(childData.child_id)} className='btn btn-success mb-2'>Edit</Button>&nbsp;
                          <Button onClick={() => DeleteChild(childData.child_id)} className='btn btn-danger mb-2'>Hapus</Button></td>
                        <td>{childData.child_gender}</td>
                        <td>{childData.child_long} Cm</td>
                        <td>{childData.child_weight} Kg</td>
                        <td>{childData.child_condition}</td>
                      </tr>
                    ))

                    }

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} className='text-center' id={spinnerActionChild}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
      <Modal show={show}
        size="md"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Data Anak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Panjang Bayi</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control type='text' defaultValue={longChild} onChange={(e) => setLongChild(e.target.value)} />
                    <InputGroup.Text id="basic-addon2">CM</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Berat Bayi</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control type='text' defaultValue={weightChild} onChange={(e) => setWeightChild(e.target.value)} />
                    <InputGroup.Text id="basic-addon2">KG</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Gander Bayi</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option >{genderChild}</option>
                    <option onClick={() => seletedGender('Laki-Laki')}>Laki-Laki</option>
                    <option onClick={() => seletedGender('Perempuan')}>Perempuan</option>

                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Keadaan Bayi</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>{conditionChild}</option>
                    {
                      coditionChild.map((codition, index) => (
                        <option key={index} onClick={() => seletedCondition(codition)}>{codition}</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => ButtonSaveChild(methodButton)}>Simpan</Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default FormDetailPage
