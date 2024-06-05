package com.example.demo.pagination;

import lombok.Data;

@Data
public class SearchDTO {
	private int page; // 현재 페이지 번호
	private int recordSize; // 페이지당 출력할 데이터 개수
	private int pageSize; // 화면 하단에 출력할 페이지 사이즈
	
	private String searchKeyword; // 검색 키워드
	private String searchType; // 검색 유형

	private String sortType; // 정렬유형
	
	private String startDate; //날짜검색 시작날짜
	private String endDate; //날짜검색 종료날짜
	
	private Pagination pagination; // 페이지네이션 정보

	public SearchDTO() {
		this.page = 1;
		this.recordSize = 10;
		this.pageSize = 10;
	}

	public SearchDTO(int page, String searchKeyword) {
		this.page = page;
		this.searchKeyword = searchKeyword;
		this.recordSize = 10;
		this.pageSize = 10;
	}

}
