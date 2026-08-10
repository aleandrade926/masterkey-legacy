import React, { useState, useRef } from 'react';
import { UploadCloud, FileType, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { parseNfseXml } from '../../lib/nfseParser';
import type { NfseData } from '../../lib/nfseParser';

export default function ConversorNfse() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const xmlFiles = newFiles.filter(file => file.name.toLowerCase().endsWith('.xml'));
    setFiles(prev => [...prev, ...xmlFiles]);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      alert("Por favor, adicione arquivos XML primeiro.");
      return;
    }

    const dataRows: NfseData[] = [];

    for (const file of files) {
      const text = await file.text();
      const data = parseNfseXml(text);
      if (data) {
        dataRows.push({
          ...data,
          // Convert dot to comma for numeric fields if needed for excel, or leave as string
        });
      }
    }

    if (dataRows.length === 0) {
      alert("Nenhum dado pôde ser extraído dos arquivos selecionados.");
      return;
    }

    // Prepare data for Excel
    const worksheet = XLSX.utils.json_to_sheet(dataRows.map(row => ({
      "Número da Nota": row.numeroNota,
      "Competência": row.competencia,
      "Data de Emissão": row.dataEmissao,
      "Prestador": row.prestador,
      "Tomador": row.tomador,
      "Valor Bruto": row.valorBruto,
      "Valor Líquido": row.valorLiquido,
      "Base de Cálculo": row.baseCalculo,
      "ISSQN": row.issqn,
      "Retenções (Federais)": row.retencoes,
      "NBS": row.nbs,
      "Município de Incidência": row.municipioIncidencia,
      "IBS": row.ibs,
      "CBS": row.cbs
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Notas Fiscais");
    
    // Auto-size columns slightly
    const colWidths = [
      { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 30 },
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 },
      { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 15 }
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, "Relatorio_Nfse.xlsx");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileType className="text-primary w-6 h-6" />
            Conversor XML para Excel | NFS-e Nacional
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Transforme XML de nota fiscal de serviço em planilha Excel com visão de faturamento, ISS, retenções, IBS, CBS e dados fiscais para contabilidade, auditoria e gestão financeira.
          </p>
        </div>

        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer
              ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              multiple
              accept=".xml"
            />
            <div className="mx-auto w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-slate-400">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              Arraste seus XMLs de NFS-e Nacional e eventos de cancelamento aqui
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              ou clique nesta área para escolher vários arquivos
            </p>
            
            {files.length === 0 && (
              <div className="mt-6 inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50">
                Nenhum arquivo escolhido
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-700 mb-3">
                Arquivos selecionados ({files.length})
              </h4>
              <ul className="max-h-48 overflow-y-auto bg-slate-50 rounded-lg border border-slate-200 divide-y divide-slate-200">
                {files.map((file, index) => (
                  <li key={index} className="px-4 py-3 flex items-center justify-between text-sm">
                    <span className="text-slate-600 truncate mr-4">{file.name}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Remover arquivo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex justify-center items-center px-4 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Escolher arquivos
            </button>
            <button
              onClick={handleConvert}
              disabled={files.length === 0}
              className={`flex-1 flex justify-center items-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white 
                ${files.length === 0 
                  ? 'bg-emerald-400 cursor-not-allowed opacity-70' 
                  : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'} 
                transition-colors`}
            >
              Converter
            </button>
            <button
              onClick={clearFiles}
              disabled={files.length === 0}
              className={`flex-1 flex justify-center items-center px-4 py-3 border shadow-sm text-sm font-medium rounded-lg transition-colors
                ${files.length === 0
                  ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
                }`}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
