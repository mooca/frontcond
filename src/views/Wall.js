import React, { useState, useEffect} from 'react';
import { CCard, CButton, CCardBody, CCardHeader, CCol, CRow, CDataTable, CButtonGroup, 
    CModal, CModalHeader, CModalBody, CModalFooter, CLabel, CFormGroup, 
    CInput, CTextarea } from '@coreui/react';
import { useHistory} from 'react-router-dom';
import useApi from '../services/api';
import CIcon from '@coreui/icons-react';

export default () => {
    const api = useApi();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const [modalTitleField, setModalTitleField] = useState('');
    const [modalBodyField, setModalBodyField] = useState('');
    const [modalId, setModalId] = useState('');

    const fields = [
        {label: '#', key: 'id'},
        {label: 'Titulo', key: 'title'},
        {label: 'Data de criação', key: 'datecreated', _style:{width:'200px'}},
        {label: 'Ações', key: 'actions', _style:{width:'1px'}},
    ];

    useEffect(()=>{      
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);

        if(result.error === ''){
            setList(result.list);
        }else{
            alert(result.error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleEditButton = (index) => {
        setModalId(list[index]['id']);
        setModalTitleField(list[index]['title']);
        setModalBodyField(list[index]['body']);
        setShowModal(true);
    }
    
    const handleNewButton = () =>{
        setModalId('');
        setModalTitleField('');
        setModalBodyField('');
        setShowModal(true);
    }
    
    const handleModalSave = async () => {
        if(modalTitleField && modalBodyField) {
            setModalLoading(true);
                let result;
                let data = {
                    title: modalTitleField,
                    body: modalBodyField 
                }
                if(modalId === ''){
                    result = await api.addWall(data);
                }else{
                    result = await api.updateWall(modalId, data);
                }
                

            setModalLoading(false);
            if(result.error === ''){
                setShowModal(false);
                getList();
            }else{
                alert(result.error);
            }
        }else{
            alert('Preencha os campos');
        }
    }
    const handleRemoveButton = async (index) => {
        if(window.confirm('Tem certeza que deseja excluir?')){
            const result = await api.removeWall(list[index]['id']);
            if(result.error === ''){
                getList();
            }else{
                alert(result.error);
            }
        }
    }
    return (
        <>
        <CRow>
            <CCol>
                <h2> Mural de Avisos</h2>
                <CCard>
                    <CCardHeader>
                        <CButton color="primary" onClick={handleNewButton}>
                            <CIcon name="cil-check" /> Novo Aviso
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        
                        <CDataTable
                            items={list}
                            fields={fields}
                            loading={loading}
                            noItemsViewSlot=" "
                            hover
                            striped
                            bordered
                            pagination
                            itemsPerPage={2}
                            scopedSlots={{
                                'actions': (item, index)=>(
                                    <td>
                                        <CButtonGroup>
                                            <CButton class="infor" onClick={()=>handleEditButton(index)} >Editar</CButton>
                                            <CButton class="danger" onClick={()=>handleRemoveButton(index)}>Excluir</CButton>
                                        </CButtonGroup>
                                    </td>
                                )
                            }}
                        >
                            
                        </CDataTable>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>


        <CModal show={showModal} onClose={handleCloseModal} >

            <CModalHeader closeButton> {modalId === '' ? 'Novo Aviso' : 'Editar Aviso'}</CModalHeader>
            <CModalBody>
               
               <CFormGroup>
                   <CLabel htmlFor="modal-title">Titulo do aviso</CLabel>
                   <CInput
                    type="text"
                    id="modal-title"
                    placeholder="Digite um título para aviso"
                    value={modalTitleField}
                    onChange={e=>setModalTitleField(e.target.value)}
                    disabled={modalLoading}
                   />
               </CFormGroup>
               <CFormGroup>
                   <CLabel htmlFor="modal-title">Corpo do aviso</CLabel>
                   <CTextarea
                    id="modal-body"
                    placeholder="Digite o conteúdo do aviso"
                    value={modalBodyField}
                    onChange={e=>setModalBodyField(e.target.value)}
                    disabled={modalLoading}
                   />
               </CFormGroup>

            </CModalBody>
            <CModalFooter>
                <CButton 
                    color="primary"
                    onClick={handleModalSave}
                    disabled={modalLoading}
                >{modalLoading ? 'Carregando' : 'SALVAR'}</CButton>
                <CButton 
                    color="secondary"
                    onClick={handleCloseModal}
                    disabled={modalLoading}
                >Cancelar</CButton>
            </CModalFooter>
        </CModal>


        </>
    );
}