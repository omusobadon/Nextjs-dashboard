import React from 'react';

interface FetchLodging {
    isLoading: boolean;
    error: Error | null;
    colSpan: number;
  }
  

export default function FetchLoading ({ isLoading, error, colSpan }: FetchLodging){
  if (isLoading) {
    return (
      <tr>
        <td colSpan={colSpan}>
          Loading Please Wait...
          <p>データベースから読み込んでいます。お待ちください。</p>
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} className="font-bold error-message">
            エラー: {error.toString()}
            <p>在庫の取得に失敗しました。</p>
            <p>Go_APIを起動しているか確認してください。</p>
            <p>解決しない場合は、管理者にお問い合わせください。</p>
          </td>
        </tr>
      </tbody>
    );
  }

  return null;
};
